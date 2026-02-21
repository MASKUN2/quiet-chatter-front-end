# Implementing Talk Delete and Edit Features

## 1. Task Description
Expose edit and delete features in the UI for Talks (reviews/comments) written by users and implement their actual functionality.
The edit/delete buttons should only be visible to the original author.

## 2. Implementation Method

### A. Verify and Update the Data Model
Verify if author identification information is included in the `Talk` data model.
If fields like `isMine` or `writerId` are missing from the API response (`GET /api/v1/talks`), backend API confirmation might be needed; however, the frontend may require logic to compare the user's own ID fetched via `getMe()` with the `writerId` of the `Talk` object.
(The response structures of `auth/me` and `talks` must be mapped according to the API specification.)

### B. Modify the `TalkItem` Component
Modify `src/components/book/TalkItem.tsx`.

1. **Permission Check**: Determine if the currently rendered Talk belongs to the current user using the `talk` data received via `props` or `currentUser` information injected from a parent component.
2. **Button UI**: If it's the user's own post, display edit and delete icon buttons at the top right or bottom.
3. **Edit Mode**:
    *   When the edit button is clicked, switch the text display area to a `TextField`.
    *   Expose "Save" and "Cancel" buttons.
    *   Upon saving, call `api.updateTalk(id, content)`.
4. **Delete Logic**:
    *   When the delete button is clicked, reconfirm via `window.confirm` or a modal.
    *   Upon confirmation, call `api.deleteTalk(id)` and refresh the list.

### C. List Refresh Handling
If an edit or delete is successful, it must be immediately reflected in the UI.
*   **Edit**: Change the content in the local state or reload the list.
*   **Delete**: Remove the item from the list or reload the list.

## 3. UI/UX Considerations
*   **Editing UI**: When entering edit mode, the existing text should be pre-filled in the input field.
*   **Error Handling**: Provide notifications (Toast/Alert) to the user if an edit/delete fails.
