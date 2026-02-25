# Workflow & Environment Guide

This document explains the required workflows, local environment setups, and rules for writing and submitting code in the `quiet-chatter-front-end` project.

## 1. Local Development Setup

This section explains how to run the project locally on your computer and how it connects to the backend APIs.

### API Proxy (using Vite)
When you are coding locally, your browser might block requests sent to a different server domain (CORS errors). To fix this safely, our Vite development server acts as a proxy for the backend.
- **Local URL**: When your code requests `http://localhost:5173/api/...`, Vite secretly catches it and forwards it to our real **Backend API**.
- **Configuration**: You can find this setup in `vite.config.ts`.
- **Target**: This target address can be changed using a `.env` file, but it usually points to our production API by default.

### Mocking (with MSW)
Sometimes you want to build frontend UI features when the backend isn't ready, or when you want to force specific error scenarios. We use **Mock Service Worker (MSW)** for this!
- **How to start**: Run `npm run dev:mock` in your terminal instead of the normal dev script.
- **Where are the fakes?**: You can view and modify the fake data responses in `src/mocks/handlers.ts`.
- **Why use it?**: It intercepts API calls at the network level in your browser and returns fake data instantly, letting you build the UI perfectly without needing a real working backend server.

## 2. API Integration Workflow (Crucial)

When integrating with the backend server, we enforce incredibly strict type checking.

1. **Never mutate types manually**: If the API changes on the backend, run `npm run gen:types`. This will automatically download and build the TypeScript definitions using the backend's OpenAPI specification rule sheet. 
2. **Use the generated types**: Look into `src/types/api-schema.d.ts` if you need hints on object shapes, but **NEVER manually modify this file**.
3. **Update the API layer**: Update `src/api/api.ts`, making sure all function return types properly trace back to the auto-generated types!

## 3. The Verification Checklist

You are not done with writing code until it passes all of these steps perfectly:

- [ ] **Build Test**: Run `npm run build`. It must exit with ZERO errors.
- [ ] **Code Quality**: Run `npm run lint`. It must exit with ZERO warnings.
- [ ] **Runtime Test**: Open the app with `npm run dev` and test your new feature manually. Check the browser console to ensure there are no sneaky React warnings or errors.

## 4. Git Commit Convention

To keep our GitHub history clean, easy to read, and to allow automated release versioning, we strictly follow [Conventional Commits](https://www.conventionalcommits.org/).

**Format**: `<type>(<scope>): <subject>` (the `(scope)` part is optional)
**Example**: `feat(auth): Add Naver login integration`

**Allowed Types:**
- **feat**: Add a completely new feature
- **fix**: Fix a bug or broken piece of code
- **docs**: Change only the documentation (`.md` files)
- **style**: Change formatting (spacing, missing semi-colons, etc., NO actual logic code changes)
- **refactor**: Rewrote some code to make it better, but it does exactly the same thing
- **test**: Add or fix tests
- **chore**: Update build tools, package manager config, or perform minor repository cleanups
- **ci**: CI script updates
