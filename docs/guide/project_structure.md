# Project Structure & Environment Guide

This document explains the code organization and environment configuration for the frontend project.

## 1. Directory Structure

```
quiet-chatter-front-end/
├── .gemini/             # AI agent configurations and history
├── docs/                # Project documentation
│   └── guide/           # Development guide documents
├── public/              # Static resources (images, icons)
├── src/                 # Source code
│   ├── api/             # API request functions (Axios)
│   ├── assets/          # Imported assets (SVG, etc.)
│   ├── components/      # Reusable UI components
│   │   ├── book/        # Domain: Book
│   │   ├── common/      # Domain: Common (Layout, Modal)
│   │   └── home/        # Domain: Home
│   ├── constants/       # Static text and config
│   ├── context/         # Global state (AuthContext)
│   ├── hooks/           # Custom React Hooks (Business Logic)
│   ├── pages/           # Route Page Components
│   ├── types/           # TypeScript Definitions (Auto-generated)
│   ├── App.tsx          # Main Layout & Routing
│   └── main.tsx         # Entry Point
└── ...
```

### Key Directories
- **`src/api`**: Pure functions for backend communication. Do not put UI logic here.
- **`src/hooks`**: Encapsulates business logic (e.g., `useBookSearch`). Components should rely on hooks for data, not API calls directly.
- **`src/pages`**: Top-level route components. They compose `components` to build a screen.
- **`src/types`**: `api-schema.d.ts` is auto-generated from the backend OpenAPI spec. **Do not edit manually.**

---

## 2. Infrastructure & Environment

This section explains how to run the project locally and how it connects to the backend.

### 2.1 Staging Environments
We maintain separate environments for development and production.
*(For specific domain URLs and deployment policies, refer to **[infrastructure_policy.md](https://github.com/maskun2/quiet-chatter-docs/blob/main/infrastructure_policy.md)** in the shared documentation.)*

### 2.2 Local Development Setup

#### API Proxy (Vite)
To avoid CORS issues during development, requests to `/api` are proxied by Vite.
- **Local URL**: `http://localhost:5173/api/...` -> Proxies to -> **Backend API**
- **Configuration**: `vite.config.ts`
- **Target**: Controlled via `.env` or defaults to the production API.

#### Mocking (MSW)
We support **Mock Service Worker (MSW)** for frontend-only development.
- **Command**: `npm run dev:mock`
- **Handlers**: Defined in `src/mocks/handlers.ts`.
- **Use Case**: UI development without a running backend, or testing specific error states.
