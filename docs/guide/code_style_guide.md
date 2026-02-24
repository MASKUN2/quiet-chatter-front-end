# Code Style Guide

This document explains the code style and writing rules for the `quiet-chatter-front-end` project. Following these rules makes our code easier to read and fix.

## 1. Basic Rules

- **Use TypeScript**: All files must end with `.ts` or `.tsx`. Try not to use the `any` type, and always give variables clear types.
- **Functional Components**: All React components should be written as functional components (e.g., `React.FC`).
- **Code Cleanliness (ESLint)**: We use tools like ESLint to automatically catch errors and style issues. Always fix these warnings!

## 2. Naming Convention

How to name different parts of the code:
- **Folders / Directories**: Always use lowercase, and use hyphens `-` for spaces (e.g., `book-detail` or `common-components`).
- **Component Files**: Use PascalCase (e.g., `BookList.tsx`, `Header.tsx`).
- **Functions and Variables**: Use camelCase (e.g., `handleSearch`, `fetchBooks`, `isLoading`).
- **Interfaces and Types**: Use PascalCase (e.g., `Book`, `MemberResponse`).
- **Constants**: Use camelCase normally, but if it is an important setting or configuration value that never changes, you can use UPPER_SNAKE_CASE (e.g., `API_BASE_URL`).

## 3. Development and Design Principles

### Component Design
- **Keep it Simple**: Don't put too much code in one file. If a UI piece is used a lot, make it a separate component. If the logic gets crazy, move it to a custom hook in `src/hooks/`.
- **Mobile First**: Always design for phones first! Use MUI's `useMediaQuery` or Breakpoints in the `sx` prop to adjust sizes for larger screens.

### State Management Strategy
- **Local State (`useState`)**: Best for data used in only one component (like typing in an input box).
- **Global State (`Context API`)**: Only use this for data needed everywhere, like the user's login `AuthContext`.
- **URL State (`useSearchParams`)**: If users need to share a link (like a search page or specific page number), put that state in the URL. The URL should be the main source of truth.

### Error Handling
- If a background network request (API call) fails, tell the user! Use an Alert or Toast message.
- For business logic errors, usually show the message sent from the backend as it is.

## 4. Component Structure Example

This is exactly how a component file should look:

```tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
// Remember, use the auto-generated types!
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

  // 3. Render the UI
  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
      {/* ... Add other cool components here ... */}
    </Box>
  );
};

export default ComponentName;
```

## 5. API Calls and Hooks

- API call logic should not be written directly inside components. Instead, import and use the helper functions from `src/api/api.ts`.
- Complex data fetching or logic (e.g., infinite scroll or complicated calculations) should be separated into individual hooks within the `src/hooks/` folder.

## 6. Commit Convention

To keep our GitHub history clean and easy to read, we follow these simple rules for commit messages:
- **Format**: `<type>(<scope>): <subject>` (the `(scope)` part is optional)
- **Example**: `feat(auth): Add Naver login integration`

**Types of Commits:**
- **feat**: Add a completely new feature
- **fix**: Fix a bug or broken piece of code
- **docs**: Change only the documentation (`.md` files)
- **style**: Change formatting (spacing, missing semi-colons, no actual code changes)
- **refactor**: Rewrote some code to be better, but it does the same thing
- **test**: Add or fix tests
- **chore**: Update build tools, package manager config, or minor cleanups
- **ci**: CI script updates
