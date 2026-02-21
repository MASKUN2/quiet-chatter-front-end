# Project Development History

This document records the major changes and technical decisions of the `quiet-chatter-front-end` project.

## Initial Setup and Transition to React (2026-01)

The frontend was separated from the existing backend (Spring Boot + Thymeleaf) integrated structure and established as a separate project.

### Tech Stack Selection and Project Setup: 2026-01-20
- **Background**: Given the nature of the SNS-type service with high user interaction, an SPA (Single Page Application) structure was deemed appropriate.
- **Decision**:
    - **Build Tool**: Selected **Vite** for its fast build speeds and superior development experience.
    - **Framework**: Adopted **React** for its large, stable ecosystem and **TypeScript** for type safety.
    - **UI Library**: Chose **Material UI (MUI)** for rapid prototyping and a clean design system.

### Authentication System Implementation: 2026-01-21
- **Details**: Implemented a JWT-based authentication system managed on the frontend.
- **Implementation**:
    - Global `Member` login state is managed via `AuthContext`.
    - Upon app execution, `/v1/auth/me` is called to verify session (cookie) validity and load member information.
    - Initially, users were automatically promoted to `Guest` status when not logged in, but this policy was later changed to maintaining anonymity alongside the introduction of Naver login.

### Introduction of API Integration Automation: 2026-01-30
- **Background**: Manually matching frontend type definitions with backend API changes was costly and error-prone.
- **Solution**: Established a pipeline to automatically generate TypeScript types based on the backend's OpenAPI (Swagger) JSON spec using the `openapi-typescript` library.
- **Effect**: Backend spec changes can now be reflected immediately with a single `npm run gen:types` command, detecting type mismatches at compile time. Currently synchronized against `dev-api.quiet-chatter.com`.

### Major Feature Implementation (Sprint 1): 2026-01 ~ 2026-02
- **Book Search**: Implemented book search via a backend API routing through the Naver Book API, applying infinite scroll using the **Intersection Observer** API to improve UX.
- **BookTalk (Talk) CRUD**: Implemented features to leave, edit, and (soft) delete reviews for books. (Login required)
- **Reactions**: Implemented Like/Empathy features, applying optimistic update patterns to parts of the UI for instant feedback.

### Infrastructure Advancement and Auth System Overhaul (2026-02)
- **Staging Strategy**: Following the backend's `dev` stage separation, frontend configurations were split to use `dev.quiet-chatter.com` and `dev-api.quiet-chatter.com`, and type generation automation was updated.
- **Deployment Automation**: Established a continuous deployment environment via Cloudflare Pages.
- **Term and Policy Unification**: Refactored the term `User` to `Member` to match the backend entity. Additionally, to enhance security, the automatic GUEST promotion filter was removed, and policies were changed so only Naver-logged-in users can create data.
- **Auth Completion**: Handled the entire Naver login process via frontend callbacks and implemented a **Logout** feature that clearly terminates the server session, reflecting it in the UI.

### Transition to Automated Release Management (2026-02-20)
- **Background**: Transitioned from the existing `release-please` method to `semantic-release` for its flexibility and rich plugin ecosystem, aiming for more sophisticated version management and release notes.
- **Decision**:
    - **Tools**: Introduced `semantic-release`, `@semantic-release/changelog`, `@semantic-release/github`, etc.
    - **Convention**: Adopted [Conventional Commits](https://www.conventionalcommits.org/) as the standard commit convention to automate release type (Major/Minor/Patch) decisions.
    - **Automation**: Configured via GitHub Actions to automatically perform version tagging, `CHANGELOG.md` updates, and GitHub Release creation whenever a push occurs to the `main` branch.
