# Code Style Guide

This document defines the strict code styling and writing conventions for the `quiet-chatter-front-end` project. Following these formatting rules guarantees our code remains highly readable and consistent across the team.

*(For information about React Component structures, hooks, and State management, please refer to the **Architecture Guide**).*

## 1. Core Principles

- **Use TypeScript**: All logic and component files must end with `.ts` or `.tsx`. Try not to use the `any` type under any circumstances. Always provide or define explicit types for variables and function parameters.
- **Code Cleanliness (ESLint)**: We use tools like ESLint to automatically catch errors and styling issues. 
    - **Rule**: If ESLint throws a warning or error, you must fix the code! Do not use `// eslint-disable-next-line` unless absolutely critical.

## 2. Naming Conventions

How to name different parts of the code:

### Files & Folders
- **Folders / Directories**: Always use lowercase, and use hyphens `-` for spaces (e.g., `book-detail` or `common-components`).
- **Component Files**: Use PascalCase (e.g., `BookList.tsx`, `Header.tsx`, `App.tsx`).
- **Logic Files**: Use camelCase (e.g., `api.ts`, `useBookSearch.ts`).

### Variables & Functions
- **Variables**: Use camelCase (e.g., `searchKeyword`, `isLoading`, `currentUser`).
- **Functions**: Use camelCase. Try to start with verb actions (e.g., `handleSearch`, `fetchBooks`, `calculateTotal`).
- **Booleans**: Try to prefix with `is`, `has`, or `should` (e.g., `isLoggedIn`, `hasReacted`).

### Types & Constants
- **Interfaces and Types**: Use PascalCase (e.g., `Book`, `MemberResponse`, `AuthContextType`).
- **Constants**: Use camelCase normally, but if it is an important global configuration value that never changes, you can use UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MESSAGES.ERROR`).
