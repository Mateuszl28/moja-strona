#!/usr/bin/env bash
# Włącza HTTPS dla programujzmateuszem.pl (+ www) na VPS, nie ruszając vhosta Vibe.
#
# Problem: na :443 był tylko vhost vibeleszno.com, więc https://programujzmateuszem.pl
# trafiał do sklepu Vibe (z błędem certyfikatu).
#
# Uruchom na serwerze jako root:  bash enable-https.sh
set -euo pipefail

DOMAIN=programujzmateuszem.pl
CONF=/etc/nginx/sites-available/portfolio
WEBROOT=/var/www/html

cp "$CONF" "/root/portfolio.nginx.bak-$(date +%Y%m%d%H%M)"
mkdir -p "$WEBROOT/.well-known/acme-challenge"

proxy_block='
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;'

# ── KROK 1: HTTP z odsłoniętym wyzwaniem ACME (reszta jak dotąd → Next.js) ──
cat > "$CONF" <<CONF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location /.well-known/acme-challenge/ {
        root $WEBROOT;
    }

    location / {$proxy_block
    }
}
CONF
nginx -t && systemctl reload nginx

# ── KROK 2: certyfikat (konto certbota już istnieje — z certu Vibe) ──
certbot certonly --webroot -w "$WEBROOT" -d "$DOMAIN" -d "www.$DOMAIN" \
  --non-interactive --keep-until-expiring

# ── KROK 3: HTTP → HTTPS dla domeny portfolio + blok :443 ──
cat > "$CONF" <<CONF
# Domyślny :80 (wejście po IP itp.) — jak dotąd, prosto do Next.js.
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location /.well-known/acme-challenge/ {
        root $WEBROOT;
    }

    location / {$proxy_block
    }
}

# Domena portfolio po HTTP → HTTPS.
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location /.well-known/acme-challenge/ {
        root $WEBROOT;
    }

    location / {
        return 301 https://$DOMAIN\$request_uri;
    }
}

# www → bez www.
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.$DOMAIN;

    ssl_certificate     /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    return 301 https://$DOMAIN\$request_uri;
}

# Portfolio po HTTPS. default_server: nieznane hosty na :443 nie lądują już na Vibe.
server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    server_name $DOMAIN;

    ssl_certificate     /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location /_next/static/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {$proxy_block
    }
}
CONF
nginx -t && systemctl reload nginx
echo "Gotowe: https://$DOMAIN"
