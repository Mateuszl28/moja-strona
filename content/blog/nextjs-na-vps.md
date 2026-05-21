---
title: "Jak postawiłem to portfolio na własnym VPS"
date: "2026-05-21"
excerpt: "Od pustego serwera Ubuntu do działającego Next.js 14 z nginx, PM2 i HTTPS. Krótki przewodnik z prawdziwymi pułapkami."
tags:
  - vps
  - devops
  - nextjs
---

Zamiast deployować portfolio na Vercel (jak wszyscy), wziąłem prosty VPS z Ubuntu i postawiłem wszystko ręcznie. Po co? Żeby się nauczyć. To krótka relacja z tego, co działało i co poszło nie tak.

## Stos

- **Ubuntu 22.04** (świeży VPS, 1 vCPU, 1 GB RAM)
- **Node.js 20** z NodeSource
- **Next.js 14** w trybie produkcyjnym
- **PM2** jako process manager
- **nginx** jako reverse proxy

## Instalacja Node.js

Pierwsza pułapka: domyślne repo Ubuntu instaluje Node 12, a Next 14 wymaga ≥ 18. Trzeba użyć NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v  # v20.x.x
npm -v   # 10.x.x
```

## PM2 i build

```bash
npm install -g pm2
git clone https://github.com/Mateuszl28/moja-strona.git portfolio
cd portfolio
npm install
npm run build
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup systemd -u root --hp /root
```

PM2 automatycznie wystartuje aplikację po reboocie serwera.

## nginx jako reverse proxy

Next nasłuchuje na porcie 3000, ale chcemy serwować na porcie 80. Konfiguracja w `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktywacja:

```bash
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

## Co poszło nie tak

**Heredoc w terminalu** — kopiowanie wieloliniowych komend z bracketed paste mode czasem dorzucało dziwne znaki przed terminatorem `EOF`. Skończyło się na ręcznym tworzeniu pliku przez `nano`.

**Konflikt `package-lock.json`** — przy każdym `git pull` był konflikt, bo lokalny `npm install` generował własną wersję. Rozwiązanie: `git checkout package-lock.json` przed pullem.

**Stara wersja Node** — apt zignorował repo NodeSource i zainstalował 12 zamiast 20. Trzeba było ręcznie odinstalować i powtórzyć.

## Aktualizacje w przyszłości

```bash
cd /var/www/portfolio
git checkout package-lock.json
git pull
npm install
npm run build
pm2 restart portfolio
```

Cztery komendy i jest. Czas trwania: ~30 sekund.

## Czy warto?

Vercel byłby szybszy do postawienia (1 klik), ale na VPS:

1. Mam pełną kontrolę nad środowiskiem.
2. Uczę się rzeczy, których nie nauczyłbym się klikając w UI.
3. Płacę jedną stawkę za serwer — mogę dorzucać kolejne projekty.

Następny krok: HTTPS przez Let's Encrypt + własna domena. Niedługo.
