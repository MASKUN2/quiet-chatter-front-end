# Authentication Guide

This document defines the authentication system and member permission policies for the Quiet Chatter project.

## 1. Member Roles

The project has two states, consistent with the backend member system:

- **Anonymous**: Not logged in. `member.isLoggedIn` is `false`.
- **Authenticated Member**: Logged in via Naver OAuth. Holds either `REGULAR` or `MANAGER` roles.

## 2. Authorization Policy

### Read Permissions
- All users, including anonymous users, can search for books, view book details, browse BookTalk lists, and view recommended BookTalks.

### Write/Edit Permissions
- **Creating BookTalks and Reactions**: Requires login (`isLoggedIn: true`). If a non-logged-in user attempts this, the UI should guide them to login or show an informational message.
- **Edit and Delete**: Possible only for the original author (matching Member ID).

## 3. Auth Flow

### Login
- Authentication is performed using a Naver OAuth 2.0 code.
- The frontend callback page (`/auth/login/naver/callback`) calls the server API to establish a session.

### Logout
- Call the `logout` function from `AuthContext`.
- This invalidates the server session (cookie) and immediately deletes the `auth_member` cache from local storage.

### Persistence
- Upon app initialization, the authentication verification API (e.g., `/v1/auth/me`) is called to verify the current session's validity and update the global state.
- When the access token expires, it is automatically renewed in the background (Silent Refresh) via a refresh token.

## 4. Implementation Guide

- **Accessing State**: Use the `useAuth()` hook to access the `member` object.
- **Permission Check Example**:
  ```tsx
  const { member } = useAuth();
  if (!member?.isLoggedIn) {
    // Logic to induce login
  }
  ```
