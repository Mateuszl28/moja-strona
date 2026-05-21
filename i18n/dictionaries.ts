export type Locale = "pl" | "en";

export const defaultLocale: Locale = "pl";

export const dictionaries = {
  pl: {
    nav: {
      home: "Home",
      about: "O mnie",
      skills: "Umiejętności",
      projects: "Projekty",
      teraz: "Teraz",
      blog: "Blog",
      contact: "Kontakt",
      cta: "Napisz do mnie",
    },
    hero: {
      badge: "Dostępny do pierwszej pracy",
      greeting: "Cześć, jestem",
      role: "Junior frontend developer. Buduję rzeczy w internecie z",
      and: "i",
      learning: "Stale się uczę.",
      seeProjects: "Zobacz projekty",
      contactMe: "Skontaktuj się",
      stats: {
        projects: "Projektów",
        experience: "Doświadczenia",
        coffee: "Linijek kawy",
      },
    },
    about: {
      label: "O mnie",
      title: "O",
      titleAccent: "mnie",
      subtitle: "Kilka rzeczy, które warto o mnie wiedzieć",
    },
    skills: {
      label: "Tech stack",
      title: "Mój",
      titleAccent: "tech stack",
      subtitle: "Narzędzia, których używam na co dzień.",
    },
    projects: {
      label: "Projekty",
      title: "Moje",
      titleAccent: "projekty",
      subtitle:
        "Wybrane projekty z case studies — kliknij, żeby zobaczyć decyzje techniczne.",
      caseStudy: "Case study",
      seeAll: "Wszystkie projekty",
    },
    hireMe: {
      badge: "Open to Work",
      title: "Szukasz juniora,",
      titleAccent: "który chce się rozwijać?",
      description:
        "Jestem na początku drogi, ale mocno mi na niej zależy. Mam już kilka prawdziwych projektów na koncie.",
      writeMe: "Napisz do mnie",
    },
    contact: {
      label: "Kontakt",
      title: "Daj",
      titleAccent: "znać",
      subtitle:
        "Szukasz juniora do zespołu, masz pomysł na projekt, albo chcesz pogadać o kodzie? Napisz śmiało — staram się odpowiadać szybko.",
      form: {
        name: "Imię",
        email: "Email",
        message: "Wiadomość",
        namePlaceholder: "Jan Kowalski",
        emailPlaceholder: "jan@example.com",
        messagePlaceholder: "Cześć Mateusz, mam pomysł na...",
        send: "Wyślij wiadomość",
        sending: "Wysyłanie...",
        success: "Wiadomość wysłana! Odpowiem najszybciej jak to możliwe.",
      },
      info: {
        emailLabel: "Email",
        githubLabel: "GitHub",
        linkedinLabel: "LinkedIn",
        locationLabel: "Lokalizacja",
        location: "Polska • Remote",
      },
    },
    faq: {
      title: "Najczęściej",
      titleAccent: "zadawane pytania",
      subtitle: "Krótko, konkretnie. Nie ma odpowiedzi? Zapytaj AI lub napisz.",
    },
    chatbot: {
      button: "Zapytaj AI",
      title: "AI Asystent",
      greeting: "Cześć!",
      description:
        "Jestem asystentem AI. Zapytaj mnie o Mateusza — projekty, doświadczenie, technologie. Co Cię ciekawi?",
      placeholder: "Napisz pytanie...",
      examples: "Przykłady:",
    },
    common: {
      back: "Wróć na stronę główną",
      loading: "Ładowanie...",
      readMore: "Czytaj",
      minRead: "min czytania",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      teraz: "Now",
      blog: "Blog",
      contact: "Contact",
      cta: "Get in touch",
    },
    hero: {
      badge: "Available for first job",
      greeting: "Hi, I'm",
      role: "Junior frontend developer. I build things on the web with",
      and: "and",
      learning: "Always learning.",
      seeProjects: "See projects",
      contactMe: "Get in touch",
      stats: {
        projects: "Projects",
        experience: "Experience",
        coffee: "Coffee lines",
      },
    },
    about: {
      label: "About",
      title: "About",
      titleAccent: "me",
      subtitle: "A few things worth knowing",
    },
    skills: {
      label: "Tech stack",
      title: "My",
      titleAccent: "tech stack",
      subtitle: "Tools I use every day.",
    },
    projects: {
      label: "Projects",
      title: "My",
      titleAccent: "projects",
      subtitle:
        "Selected projects with case studies — click to see technical decisions.",
      caseStudy: "Case study",
      seeAll: "All projects",
    },
    hireMe: {
      badge: "Open to Work",
      title: "Looking for a junior",
      titleAccent: "who wants to grow?",
      description:
        "I'm at the beginning of my path, but committed to it. I already have a few real projects under my belt.",
      writeMe: "Get in touch",
    },
    contact: {
      label: "Contact",
      title: "Let me",
      titleAccent: "know",
      subtitle:
        "Looking for a junior, got a project idea, or just want to chat about code? Drop me a line — I try to reply fast.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        namePlaceholder: "John Doe",
        emailPlaceholder: "john@example.com",
        messagePlaceholder: "Hi Mateusz, I have an idea for...",
        send: "Send message",
        sending: "Sending...",
        success: "Message sent! I'll reply as soon as possible.",
      },
      info: {
        emailLabel: "Email",
        githubLabel: "GitHub",
        linkedinLabel: "LinkedIn",
        locationLabel: "Location",
        location: "Poland • Remote",
      },
    },
    faq: {
      title: "Frequently",
      titleAccent: "asked questions",
      subtitle: "Short and to the point. No answer? Ask AI or send a message.",
    },
    chatbot: {
      button: "Ask AI",
      title: "AI Assistant",
      greeting: "Hi!",
      description:
        "I'm an AI assistant. Ask me about Mateusz — projects, experience, technologies. What are you curious about?",
      placeholder: "Type your question...",
      examples: "Examples:",
    },
    common: {
      back: "Back to home",
      loading: "Loading...",
      readMore: "Read",
      minRead: "min read",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
