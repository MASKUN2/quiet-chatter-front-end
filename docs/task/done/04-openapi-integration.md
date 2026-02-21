# OpenAPI TypeScript Integration Guide

This document provides instructions for automatically generating TypeScript interfaces from backend API specifications (OpenAPI/Swagger) using `openapi-typescript`, enabling rapid reflection of API changes in frontend code.

## 1. Overview
Manually modifying frontend types whenever the backend API spec changes is tedious and error-prone. By following this guide to auto-generate types from remote JSON specs, you can enhance type safety and improve development productivity.

## 2. Initial Setup

### 2.1 Package Installation
Install `openapi-typescript` as a development dependency (`devDependencies`).

```bash
npm install -D openapi-typescript typescript
```

### 2.2 Adding Scripts
Add a command to generate types in the `scripts` section of your `package.json` file.

```json
{
  "scripts": {
    "gen:types": "openapi-typescript https://quiet-chatter.com/api/v1/spec -o src/types/api-schema.d.ts"
  }
}
```
*   **URL**: `https://quiet-chatter.com/api/v1/spec` (Current project's API spec address)
*   **Output**: `src/types/api-schema.d.ts` (Location where the generated type file will be saved)

## 3. Usage

### 3.1 Generating and Updating Types
Run the command below whenever the backend API changes or you want to reflect the latest spec.

```bash
npm run gen:types
```
Upon successful execution, the `src/types/api-schema.d.ts` file will be created or updated.

### 3.2 Utilizing in Code
The generated type file includes namespaces such as `paths` and `components`. Use these to define frontend model types.

**Example (`src/types/index.ts`):**

```typescript
import type { paths, components } from './api-schema';

// Extracting types directly from API schema
export type Book = components['schemas']['BookResponse']; // Update according to actual schema name
export type Talk = components['schemas']['TalkResponse'];

// Utilizing API response types
export type BookListResponse = paths['/api/v1/books']['get']['responses'][200]['content']['application/json'];
```

## 4. API Change Detection and Response Process

1.  **Backend Change Notification**: Receive word from the backend team that API changes have been deployed.
2.  **Type Update**: Run `npm run gen:types` to synchronize local type definitions with the latest.
3.  **Check Compilation Errors**: Verify if type mismatch errors occur in existing code through the TypeScript compiler (`tsc` or IDE inspection).
4.  **Code Correction**: Modify components or business logic to align with the changed API spec.

## 5. Tips

*   **Git Management**: It is recommended to commit the generated `src/types/api-schema.d.ts` file to the Git repository to share identical type definitions with team members.
*   **Pre-commit Hook**: (Optional) Use `husky` or similar tools to check for API spec changes or regenerate types before committing.
