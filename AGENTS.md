# AI Agent Task Instructions

Welcome to the `quiet-chatter-front-end` project! This document is the ultimate starting point for any AI agent or collaborative developer joining the team. It tells you exactly how we build, style, and review code here.

> **Before you write any code, read the specific guide documents located in `docs/guide/` that relate to your current task.**

## 1. Project Overview
- **Core Technology**: React + TypeScript + Vite (Deployed on Cloudflare Pages)
- **UI Framework**: Material UI (MUI) Version 6
- **Environments**:
    - **Frontend**: `dev.quiet-chatter.com` (Dev) -> `quiet-chatter.com` (Prod)
    - **Backend API**: `dev-api.quiet-chatter.com` (Dev) -> `api.quiet-chatter.com` (Prod)
- **API Specifics**: All real API calls go through `/v1` base paths. The single source of truth for the API rules is the OpenAPI specification: [quiet-chatter.com/api/v1/spec](https://quiet-chatter.com/api/v1/spec).

## 2. Planning & Design Principles
Whenever you get a task, decide how you will solve it by following these rules:
- **Use Industry Standards**: Recommend popular, reliable solutions that are widely used. Avoid obscure packages.
- **Be Decisive (Single Path)**: Don't tell the user "We could do A, or B". Just pick the best one and confidently state *why* it's the best.

## 3. Mandatory Reference Documents
Our guidelines are strictly separated by concern so you can find exactly what you need quickly:

- 🏛️ **[Architecture Guide](docs/guide/architecture_guide.md)**: Rules for React Components, App Layout, State Management, and Data Hooks.
- 🎨 **[Design & Style Guide](docs/guide/design_guide.md)**: Specific rules for Colors, Typography, Spacing, and MUI Components.
- 📝 **[Code Style Guide](docs/guide/code_style_guide.md)**: Naming conventions, TypeScript rules, and formatting logic.
- 🔐 **[Authentication Guide](docs/guide/auth_guide.md)**: How Naver OAuth works, checking login states, and guarding UI pieces.
- 🚀 **[Workflow Guide](docs/guide/workflow_guide.md)**: How to run the local server, run API mockers, run build tests, and make Git Commits.
- 📂 **[Project Structure](docs/guide/project_structure.md)**: A map of every file and folder in the `src/` directory.

> **Always refer to the Workflow Guide before integrating an API or committing code!**
