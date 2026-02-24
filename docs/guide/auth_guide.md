# Authentication Implementation Guide

This document explains how user login and authentication work in our frontend app.
For general rules about what different users can do, please read **[service_specification.md](https://github.com/maskun2/quiet-chatter-docs/blob/main/service_specification.md)** in the shared documentation repo.

## 1. Authentication State

We use a global tool called `AuthContext` to keep track of whether the user is logged in. This makes the user's details available anywhere in our code.

- **How to use it (Hook)**: `useAuth()`
- **What it holds (State Structure)**:
  ```typescript
  interface AuthContextType {
    member: Member | null; // null means the user is a guest (anonymous). Holds user info if logged in.
    loading: boolean;      // true while we check if they are logged in.
    refreshMember: () => Promise<void>; // Manually checks the server again to get the latest user details.
    logout: () => Promise<void>;    // Clears the user's session and logs them out.
  }
  ```

## 2. Login Flow (Naver OAuth)

Here is what happens when a user logs in:

1.  **User Action**: The user clicks the "Login with Naver" button.
2.  **Redirect**: The app saves the page URL they were just on into their browser's `localStorage` (as `redirect_after_login`). Then, it sends the user to the backend's Naver OAuth page.
3.  **Callback**:
    - After Naver checks their login, the backend sends the user back to our `/auth/login/naver/callback` page.
    - Our callback page runs a backend request (specifically passing the `code` and `state`).
    - The backend sets special cookies to remember the user.
    - Our app checks `localStorage` for that saved URL and sends the user right back to where they started!

## 3. Session Persistence

- **Initialization**: Every time the app loads (in `App.tsx`), `AuthContext` calls `/v1/auth/me` to see if the user's cookies are still good.
    - **Success**: We save the `member` details in our app's state, and also cache it in `localStorage` under `auth_member` for faster loads.
    - **Failure**: They are marked as a guest (`null`), and their data is removed.
- **Refresh Notes**: 
    - The backend manages tokens securely using cookies. If `getMe()` works, the user is still logged in. If it fails, they are logged out automatically.
    - *Note: Silent Refresh logic via Axios interceptors is NOT currently implemented or required for our cookie-based setup.*

## 4. Permission Handling in UI

Do not put complicated permission rules directly inside your UI parts (components). Instead, always look at the `member` state from `useAuth()`.

```tsx
const { member } = useAuth();

// 1. Conditional Rendering (Showing different things based on login)
{!member ? <LoginButton /> : <UserProfile />}

// 2. Action Guard (Stopping an action if they aren't logged in)
const handleLike = () => {
  if (!member) {
    confirm("Please login to react."); // Ask them to log in first.
    return;
  }
  // ... run the like logic code here
};
```
