# Project Structure & Environment Guide

This document explains the code organization and environment configuration for the `quiet-chatter-front-end` project. It will help you understand where to find specific files and how the application connects to the backend API.

## 1. Directory Structure

Here is a look at the main folders in our project:

```text
quiet-chatter-front-end/
├── .gemini/             # AI agent configurations and chat history
├── docs/                # Project documentation
│   └── guide/           # Development guide documents (you are here!)
├── public/              # Static resources (images, icons, mock worker)
├── src/                 # Main source code
│   ├── api/             # API request functions (Axios)
│   ├── assets/          # Imported assets (SVG, images, etc.)
│   ├── components/      # Reusable React UI components
│   │   ├── book/        # Components related to Book views
│   │   ├── common/      # Common components like Header, Footer, and Modals
│   │   └── home/        # Components for the Home page
│   ├── constants/       # Static text, config values, and API URLs
│   ├── context/         # Global state management (AuthContext)
│   ├── hooks/           # Custom React Hooks (Business Logic)
│   ├── mocks/           # Mock Service Worker (MSW) logic for local dev
│   ├── pages/           # Top-level Page Components for routing
│   ├── types/           # TypeScript Definitions (api-schema.d.ts)
│   ├── App.css          # Global CSS for App wrapper
│   ├── App.tsx          # Main Layout, Theme setup, and Routing
│   ├── index.css        # Base HTML CSS
│   └── main.tsx         # React root entry point
└── package.json         # Project dependencies and scripts
```

### Key Directories Explained

- **`src/api/`**: This folder handles all communication with our backend. Do not put User Interface (UI) code here. It uses Axios to send requests and handle responses.
- **`src/hooks/`**: This folder contains custom hooks that handle complex features like fetching data (e.g., `useBookSearch`). Components should use these hooks instead of calling the API directly.
- **`src/pages/`**: These are the main screens of our app (like Home, Search, Book Detail). They piece together smaller parts from the `components` folder.
- **`src/types/`**: The `api-schema.d.ts` file here is automatically generated from our backend API rules. **Do not type or edit anything manually in this file.**
- **`src/mocks/`**: Contains fake (mock) data setups using MSW, which is super helpful when testing parts of the UI without needing a real backend server.

---

## 2. Infrastructure & Environment

This section explains how to run the project locally on your computer and how it connects to the quiet-chatter backend.

### 2.1 Staging Environments

We have different servers for testing (dev) and for real users (production).
*(If you need to know about the specific web addresses or deployment rules, look at **[infrastructure_policy.md](https://github.com/maskun2/quiet-chatter-docs/blob/main/infrastructure_policy.md)** in the main maskun2 docs repository.)*

### 2.2 Local Development Setup

#### API Proxy (using Vite)
When you are coding on your computer, your browser might block requests to a different server (this is called a CORS error). To fix this, our Vite server pretends to be the backend.
- **Local URL**: When you go to `http://localhost:5173/api/...`, Vite secretly forwards it to our real **Backend API**.
- **Configuration**: You can find this setup in `vite.config.ts`.
- **Target**: This target address can be changed using a `.env` file, but it usually points to our production API by default.

#### Mocking (with MSW)
Sometimes you want to build the frontend, but the backend isn't ready or is down. We use **Mock Service Worker (MSW)** for this!
- **How to start**: Run `npm run dev:mock` in your terminal.
- **Where are the fakes?**: You can see and change the fake data rules in `src/mocks/handlers.ts`.
- **Why use it?**: It lets you build the UI or test tricky error messages easily without needing a real working backend server.
