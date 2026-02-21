# Infrastructure & Staging Guide

This document defines the infrastructure architecture and staging (Production/Dev) environment information for the Quiet Chatter frontend project.

## 1. Domain and Staging Information

### Production
- **Frontend**: [https://quiet-chatter.com](https://quiet-chatter.com)
- **Backend API**: [https://api.quiet-chatter.com](https://api.quiet-chatter.com)
- **Deployment Platform**: Cloudflare Pages (Automatic deployment from `main` branch)
- **Release Management**: Automatic version upgrades and `CHANGELOG.md` generation via `semantic-release`

### Development
- **Frontend**: [https://dev.quiet-chatter.com](https://dev.quiet-chatter.com)
- **Backend API**: [https://dev-api.quiet-chatter.com](https://dev-api.quiet-chatter.com)
- **Deployment Platform**: Cloudflare Pages (Automatic deployment from `dev` branch)

## 2. API Versioning and Paths

- **Versioning Strategy**: Uses URI Path Versioning.
- **Current Version**: `/v1` (e.g., `GET /v1/talks`)
- **Notes**: The `/v1` in the API path is not just a prefix but represents the resource version. When introducing new versions, be aware that these paths may change.

## 3. Local Development Environment

- **API Proxy**: When running the local development server (`npm run dev`), browser requests to `/api` are proxied to the target API server configured in `vite.config.ts`.
- **Environment Variables (`.env`)**:
    - `VITE_API_BASE_URL`: Set to `/api` during local development to route through the proxy.
    - Actual Production/Dev builds will use the respective physical API server addresses.
