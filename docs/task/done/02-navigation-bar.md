# Top Navigation Bar and User Info Display

## 1. Task Description
Improve the navigation bar (header) at the top of the screen to display information about the currently connected user.
Implement it responsively so that information can be checked through a hamburger menu (☰) in mobile environments.

## 2. Implementation Method

### A. Add API Function
Add a function to fetch user information in `src/api/api.ts`.

```typescript
// src/api/api.ts
export async function getMe(): Promise<User> { // User type definition required
  return fetch('/api/v1/auth/me').then(handleJsonResponse);
}
```

### B. Improve `Header` Component Structure
Modify `src/components/common/Header.tsx`.

1. **State Management**: Use `useEffect` to call `getMe()` upon component mount and store user information in state.
2. **UI Layout**:
    *   **Desktop**: Display the user's nickname or profile icon at the top right of the header. For Anonymous users, place a login button or leave it as empty space.
    *   **Mobile**: If the screen width is narrow (utilizing MUI's `useMediaQuery`), display a hamburger icon (`MenuIcon`) at the top right.

### C. Implement Mobile Menu
Use MUI's `Menu` and `MenuItem` components to ensure a dropdown menu opens when the hamburger button is clicked.
Include user information (nickname, role, etc.) in the menu content.

### D. Type Definition
Define the `User` interface in `src/types/index.ts`.
```typescript
export interface User {
  id: string; // or number
  nickname: string;
  role: string;
  isLogin: boolean;
}
```

## 3. Considerations
*   Ensure the UI does not break by handling exceptions for API call failures (e.g., when not logged in).
*   Use responsive design (`@media` query or MUI `sx` prop) to transition smoothly between mobile and desktop views.
