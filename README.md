# PortfolioForge ✦

PortfolioForge is a 100% serverless, client-side web application designed to let anyone build, preview, and share a stunning professional portfolio instantly — directly from their browser, with zero backend infrastructure required.

## 🎯 The Vision
The goal of PortfolioForge is ultimate portability. It is compiled into a **single, standalone HTML file**. This means anyone can host it anywhere (GitHub Pages, Netlify, or just open it locally), create their own profile, and share it globally without needing a database or server.

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

Because PortfolioForge is completely serverless, deployment takes seconds:

1.  Run `npm run build` in your terminal.
2.  Take the `index.html` file generated in the `dist/` folder.
3.  Upload that single file to **GitHub Pages**, **Vercel**, or **Netlify**.
4.  Your application is now live globally! Anyone can visit your link, use the editor to create their own portfolio, and generate their own share links.
