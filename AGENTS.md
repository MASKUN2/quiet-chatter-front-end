# AI Agent Task Instructions

This document is the mandatory entry point that AI agents must check before performing any tasks in the `quiet-chatter-front-end` project.

## 0. Project Status Summary
- **Platform**: React + TypeScript + Vite (Deployed on Cloudflare Pages)
- **Frontend Staging**: `dev.quiet-chatter.com` (Dev), `quiet-chatter.com` (Prod)
- **Backend Staging**: `dev-api.quiet-chatter.com` (Dev/Test), `api.quiet-chatter.com` (Prod)
- **API Policy**: Uses `/v1` base paths (GUEST login abolished, Naver login centric)

## 1. Mandatory Documents to Check

Before starting work, please familiarize yourself with the following guide documents.

- **[AI Agent Guide](docs/guide/ai_agent_guide.md)**: Project infrastructure, API integration, and work process.
- **[Code Style Guide](docs/guide/code_style_guide.md)**: Coding standards, component design, and error handling principles.
- **[Design Guide](docs/guide/design_guide.md)**: Visual identity, color palette, and UI implementation guide.
- **[Authentication Guide](docs/guide/authentication_guide.md)**: Member system, login flow, and permission policies.
- **[Project Structure](docs/guide/project_structure.md)**: Folder structure and description of directory roles.

## 2. Work Procedure Summary

1. **Check Documentation**: Understand the project context and rules through the linked documents above.
2. **Identify Status**: Verify that the project runs normally via `npm install` and `npm run dev`.
3. **API Synchronization**: If the task involves backend API integration, you MUST run `npm run gen:types` to update types to the latest version.
4. **Implementation and Testing**: Implement features following the guidelines and verify there are no build errors via `npm run build`.
