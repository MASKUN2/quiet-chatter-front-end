# Code Style Guide

This document defines the code style and writing principles for the `quiet-chatter-front-end` project. The goal is to maintain consistent code to improve maintainability and readability.

## 1. Basic Principles

- **Use TypeScript**: All files use `.ts` or `.tsx` extensions. Avoid using the `any` type and define explicit types.
- **Functional Components**: All components are written as functional components (React.FC).
- **ESLint/Prettier**: Comply with the linting rules configured in the project.

## 2. Naming Convention

- **Component Files**: Use PascalCase (e.g., `BookList.tsx`, `Header.tsx`).
- **Functions and Variables**: Use camelCase (e.g., `handleSearch`, `fetchBooks`, `isLoading`).
- **Interfaces and Types**: Use PascalCase (e.g., `Book`, `MemberResponse`).
- **Constants**: Constants declared with `const` should generally use camelCase, but UPPER_SNAKE_CASE is allowed for configuration values or immutable constants.

## 3. Development and Design Principles

### Component Design
- **Separation of Concerns**: Do not pack too much logic into a single file. Separate reusable UI into components and complex business logic into custom hooks (`useHook`).
- **Responsive Design**: Apply mobile-first design using MUI's `useMediaQuery` or the Breakpoint object in the `sx` prop.

### State Management Strategy
- **Local State (`useState`)**: Priorities for states used only within a component.
- **Global State (`Context API`)**: Use limitedly only for information that needs to be shared across the entire app (e.g., authentication info).
- **URL State (`useSearchParams`)**: Shareable states such as search keywords or page numbers should treat the URL parameters as the Source of Truth.

### Error Handling
- When an API call fails, appropriate feedback (Alert, Toast, etc.) must be provided to the user.
- For business logic errors, the default is to show the message sent from the backend as is.

## 4. Component Structure

```tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import type { SomeType } from '../../types';

interface ComponentProps {
  title: string;
  items: SomeType[];
}

const ComponentName: React.FC<ComponentProps> = ({ title, items }) => {
  // 1. Hooks (State, Ref, Custom Hooks)
  const [active, setActive] = useState(false);

  // 2. Event Handlers
  const handleClick = () => {
    setActive(!active);
  };

  // 3. Render
  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
      {/* ... */}
    </Box>
  );
};

export default ComponentName;
```

## 5. API Calls and Asynchronous Processing

- API call logic should not be written directly inside components. Instead, use functions imported from `src/api/api.ts`.
- Complex data fetching logic (e.g., infinite scroll) should be separated into individual hooks within the `src/hooks/` folder.

## 6. Commit Convention

To automate releases and versioning, we follow the [Conventional Commits](https://www.conventionalcommits.org/) rules.

- **feat**: Add a new feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Formatting, missing semi-colons, etc. (no code changes)
- **refactor**: Code refactoring
- **test**: Adding or correcting tests
- **chore**: Changes to the build process or package manager configuration, etc.
- **ci**: CI configuration files and script changes

**Format**: `<type>(<scope>): <subject>` (scope is optional)
Example: `feat(auth): Add Naver login integration`
