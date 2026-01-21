# FedFire

FedFire is a modern web application built with **React**, **Vite**, and **Convex**. It features a modern aesthetic and is designed for high performance and a seamless local development experience.

## 🚀 fast start

This project uses a custom automation script to set up your local backend and frontend in one command.

1.  **Install dependencies**
    ```bash
    yarn install
    # or
    npm install
    ```

2.  **Start development server**
    ```bash
    yarn dev
    # or
    npm run dev
    ```

    **What this command does:**
    *   ⬇️  Downloads the Convex local backend binary (if needed).
    *   🧹 Cleans previous local configuration (`.env.local`, `convex.json`).
    *   🔥 Starts the local Convex backend process.
    *   ✨ connects the Convex CLI and launches the Vite frontend server.

    No manual Docker or cloud configuration is required!

## 🛠 Tech Stack

*   **Frontend**: React (Vite)
*   **Backend**: [Convex](https://convex.dev/) (Local Backend)
*   **Styling**: TailwindCSS, Framer Motion
*   **Language**: TypeScript / JavaScript
*   **Design System**: Modern UI (clean, minimal, dark mode capable)

## 📂 Project Structure

*   **/convex**: Backend schema and functions (API).
    *   `schema.ts`: Database schema definitions (BlogPosts, Users, etc.).
    *   `*.ts`: Query and mutation functions.
*   **/src**: Frontend application code.
    *   `/components`: Reusable UI components.
    *   `/pages`: Application routes.
    *   `App.jsx`: Main application entry point.
*   **/scripts**: DevOps automation scripts.
    *   `dev.js`: The magic script that powers `yarn dev`.

## ✨ Key Features

*   **Fully Local Development**: The backend runs entirely on your machine for zero-latency development.
*   **Modern UI**: A premium, highly polished interface with responsive design.
*   **Real-time Data**: Powered by Convex's reactive backend.

## 📝 Notes

*   The project is configured to run specifically with a local Convex instance effectively mimicking a full stack environment without external dependencies.
*   Configuration limits for the local backend (like the admin key) are handled automatically by `scripts/dev.js`.
