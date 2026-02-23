# Authentication Implementation Guide

This document explains how authentication is implemented in the frontend application.
For general user roles and permission policies, refer to **[service_specification.md](https://github.com/maskun2/quiet-chatter-docs/blob/main/service_specification.md)** in the shared documentation.

## 1. Authentication State

We use a global `AuthContext` to manage the user's login state.

- **Hook**: `useAuth()`
- **State Structure**:
  ```typescript
  interface AuthContextType {
    member: Member | null; // null if anonymous
    isLoading: boolean;    // true during initial check
    login: () => void;     // Redirects to Naver login
    logout: () => void;    // Clears session
  }
  ```

## 2. Login Flow (Naver OAuth)

1.  **User Action**: Clicks "Login with Naver".
2.  **Redirect**: App saves current URL to `localStorage` (`redirect_after_login`) and redirects to backend OAuth endpoint.
3.  **Callback**:
    - Backend redirects back to `/auth/login/naver/callback`.
    - Callback component calls `/v1/auth/token` (or lets backend set cookies).
    - Checks `localStorage` for the original URL and redirects the user there.

## 3. Session Persistence & Refresh

- **Initialization**: On app load (`App.tsx`), we call `/v1/auth/me` to validate the session.
    - **Success**: Update `member` state.
    - **Failure (401)**: Set `member` to `null` (Anonymous).
- **Silent Refresh**:
    - `Axios` interceptors handle `401 Unauthorized` responses.
    - If a request fails with 401, it attempts to call `/v1/auth/refresh`.
    - If refresh succeeds, it retries the original request.
    - If refresh fails, it logs the user out.

## 4. Permission Handling in UI

Do not implement complex permission logic in components. Use the `member` state.

```tsx
const { member } = useAuth();

// 1. Conditional Rendering
{!member ? <LoginButton /> : <UserProfile />}

// 2. Action Guard
const handleLike = () => {
  if (!member) {
    confirm("Please login to react.");
    return;
  }
  // ... logic
};
```
