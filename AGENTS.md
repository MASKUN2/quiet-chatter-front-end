# AI Agent Task Instructions

Welcome to the `quiet-chatter-front-end` project! This document is the ultimate starting point for any AI agent or developer joining the team. It tells you exactly how we build and review code here.

> **Before you write any code, read the related guide documents located in `docs/guide/`.**

## 1. Project Overview
- **Core Technology**: React + TypeScript + Vite (It's deployed on Cloudflare Pages!)
- **UI Framework**: Material UI (MUI) Version 6
- **Environments**:
    - **Frontend**: `dev.quiet-chatter.com` (Testing) -> `quiet-chatter.com` (Live)
    - **Backend API**: `dev-api.quiet-chatter.com` (Testing) -> `api.quiet-chatter.com` (Live)
- **API Specifics**: All real API calls go through `/v1` base paths. The single source of truth for the API rules is the OpenAPI specification: [quiet-chatter.com/api/v1/spec](https://quiet-chatter.com/api/v1/spec).

## 2. Planning & Design Principles
Whenever you get a task, decide how you will solve it by following these rules:

- **Use Industry Standards**: Recommend popular, reliable solutions that are widely used. Avoid obscure packages unless entirely necessary.
- **Be Decisive (Single Path)**: Don't tell the user "We could do A, or B". Just pick the best one and loudly say *why* it's the best.
- **Respect the Global Layout**: In this app, `src/App.tsx` handles the main Header, Footer, and page wrapper. If you're creating a new page in `src/pages/`, do not rewrite the layout wrappers for it! Let `App.tsx` do its job.

## 3. Mandatory Reference Documents
Check these out before making massive scale changes!

- **[Project Structure](docs/guide/project_structure.md)**: Find where files go (hooks, components, API files) and how to run the project.
- **[Design Guide](docs/guide/design_guide.md)**: Color palettes, typography styles, and responsive layout rules.
- **[Code Style Guide](docs/guide/code_style_guide.md)**: How to name variables, manage App state, and handle errors.
- **[Authentication Guide](docs/guide/auth_guide.md)**: How Naver OAuth works, the AuthContext, and guarding UI pieces.

## 4. Development Workflow

### Phase 1: Preparation
1. Ensure the app works correctly out of the box (`npm install` -> `npm run dev`).
2. Read the specific guide matching your task (e.g. read Design Guide for a styling task).

### Phase 2: API Integration (Crucial Rule)
When interacting with the backend server, we enforce incredibly strict types.
1. **Never mutate types**: If the API changes, run `npm run gen:types`. This will auto-build the TypeScript definitions based on the backend OpenAPI rule sheet. 
2. **Never type by hand**: Look into `src/types/api-schema.d.ts` if you need hints, but NEVER manually modify this file.
3. Update `src/api/api.ts` making sure all function returns properly trace back to the auto-generated types!

### Phase 3: The Verification Checklist
You are not done with code unless it passes all to the letter:
- [ ] Build Test: `npm run build` exits with ZERO errors.
- [ ] Code Quality: `npm run lint` exits with ZERO warnings.
- [ ] Runtime Test: No sneaky console errors when you test it out manually or click through it on `npm run dev`.
