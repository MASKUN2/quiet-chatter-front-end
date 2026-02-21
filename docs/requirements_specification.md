# Requirements Specification

## 1. Overview
This document defines the functional and UI/UX requirements for the Quiet Chatter web application.

## 2. Screen Configuration and Features

### 2.1 Home Screen (`/home`)
- **BookTalk Recommendations**: Displays recommended BookTalk cards in a list format based on a random algorithm.
- **Service Introduction**: Provides a short intro video or guide area for new users.
- **Update Log**: Includes a section to notify users of recent changes.

### 2.2 Book Search (`/books/search`)
- **Search Bar**: An input field at the top where users can search for books by keywords.
- **Infinite Scroll**: The search result list automatically loads the next page when the scroll reaches the bottom.
- **Result Display**: Briefly shows the book cover, title, and author info in card format.

### 2.3 Book Detail (`/books/:bookId`)
- **Book Information**: Displays detailed book information (cover, title, author, description, external links, etc.) at the top.
- **Talk Creation**: Only logged-in users can create Talks. Non-logged-in users are shown a login inducement message.
- **Talk List**: Lists Talks written for the book in reverse chronological order.
- **Reactions**: Logged-in users can click 'Like' or 'Empathize' buttons on each Talk, with their reaction status visually indicated. If not logged in, only the reaction count is visible.
- **Edit/Delete**: Author-exclusive edit and delete buttons are exposed for the user's own Talks.

### 2.4 Common Elements (Header/Navigation)
- **Logo**: A logo at the top that navigates to the Home screen.
- **Search Bar**: Provides functionality to navigate to the book search page or search directly from anywhere.
- **Member Information**: Displays the current logged-in member's nickname and role. Provides logout functionality and shows a Naver Login button if not logged in. Collapses into a hamburger menu on mobile.
- **VOC**: A button to trigger a modal for receiving user feedback (Voice of Customer).

## 3. Technical Requirements

### 3.1 Authentication and Permissions
- **Naver OAuth**: Supports simple login via Naver accounts.
- **Anonymous Permissions**: Users who are not logged in can view all content but are restricted from write operations (Talk creation, reactions, etc.).
- **Token Management**: Renew tokens in the background (Silent Refresh) via refresh tokens when access tokens expire. Invalidate all server and client session information upon logout.

### 3.2 Performance and UX
- **Responsive**: UI must remain intact across various viewports, including desktop, tablet, and mobile.
- **Skeleton UI**: Display skeletons instead of blank screens during data loading to reduce perceived latency.
- **Optimistic Updates**: Reactions like 'Likes' should be reflected in the UI immediately without waiting for a server response for faster responsiveness.

### 3.3 Data Communication
- **OpenAPI Based**: Minimize communication errors by using types that match the backend API specification.
