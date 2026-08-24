# Folio Vitae ✦

Folio Vitae is an elegant web workspace designed to let engineers and creators build, preview, and share a stunning professional portfolio instantly — with live pastel themes, customizable layouts, and cloud synchronization.

## 🎯 The Vision
The goal of Folio Vitae is ultimate elegance and portability. Craft your developer presence with curated aesthetic themes, responsive layouts, and publish live in seconds.

## ✨ Core Features

*   **100% Serverless Architecture:** The app runs entirely in the browser. Active edits are auto-saved to local browser storage (`localStorage`), meaning users never lose their progress.
*   **Split-Screen Live Editor:** A highly intuitive layout featuring a comprehensive form on the left (Profile, About, Education, Experience, Projects, Skills) and a real-time live preview on the right.
*   **Premium Theming Engine:** Users can instantly switch their portfolio's appearance with beautifully crafted, modern CSS themes:
    *   `Engineering Dark` — Sleek, high-contrast, perfect for developers.
    *   `Minimal Light` — Clean, whitespace-heavy, professional.
    *   `Editorial Glass` — Vibrant gradients with glassmorphism UI.
    *   `Terminal Cyber` — Retro hacker aesthetic with neon accents.
*   **Built-in Image Compression:** Uploaded images are automatically converted and heavily compressed into tiny WebP Base64 strings *in the browser*, ensuring payloads remain lightweight.
*   **Universal Share Links:** 
    *   When a user clicks "Publish," the app automatically uploads their portfolio data to a free, anonymous JSON storage API (`jsonblob.com`).
    *   It generates a tiny, shareable URL (e.g., `yoursite.com/#bin/123456`).
    *   Anyone who clicks this link will see the portfolio rendered full-screen, perfectly formatted for any device.

## 🛠️ Technology Stack

*   **Frontend Framework:** React (via Vite)
*   **Styling:** Tailwind CSS (for the editor shell) + Pure CSS (for the standalone portfolio themes to ensure clean HTML export).
*   **State Management:** React Context API + Custom Hooks for `localStorage` persistence.
*   **Bundling:** `vite-plugin-singlefile` is used to compile all JavaScript, CSS, and assets into a single `dist/index.html` file.

## 🚀 How to Deploy

Because Folio Vitae is fully client-side optimized, deployment takes seconds:

1.  Run `npm run build` in your terminal.
2.  Deploy to **Vercel**, **GitHub Pages**, or **Netlify**.
3.  Your application is now live globally! Anyone can visit your link, use the editor to create their own portfolio, and publish live URLs.
