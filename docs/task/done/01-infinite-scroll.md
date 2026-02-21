# Implementing Infinite Scroll for Book Search

## 1. Task Description
Change the current method of loading the next page of the book list by clicking a "View More" button to an "Infinite Scroll" method, which automatically loads the next set of data when the user scrolls down to the bottom of the list.

## 2. Implementation Method

### A. Utilizing the Intersection Observer API
Use the browser's `IntersectionObserver` API to detect when the scroll reaches the last element of the list (or a bottom detection area).

### B. Modifying the `useBookSearch` Hook
Update `src/hooks/useBookSearch.ts` to include the observation logic.

1. **Add Observer Ref**: Create a `useRef` and a `useCallback` to reference the last element.
2. **Intersection Handler**: Write logic to call the `loadMore` function when the observed target enters the screen (`isIntersecting`).
3. **State Management**: Add guard code to ensure the observation logic does not execute during data loading (`loading`) or if there is no more data (`sliceInfo.last`).

### C. Modifying the `BookSearch` Component
Update the UI in `src/pages/BookSearch.tsx`.

1. **Target Element**: Place the last item of the list or an invisible `div` element at the bottom of the list and connect the `ref` created in `useBookSearch`.
2. **Remove Button**: Remove the existing "View More" button.
3. **Loading Indicator**: Maintain the spinner or skeleton UI at the bottom while data is being loaded.

## 3. Expected Code Snippet

```typescript
// useBookSearch.ts Example
const observer = useRef<IntersectionObserver | null>(null);
const lastBookElementRef = useCallback((node: HTMLDivElement) => {
  if (loading) return;
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && sliceInfo && !sliceInfo.last) {
      setPage(prev => prev + 1);
    }
  });
  if (node) observer.current.observe(node);
}, [loading, sliceInfo]);
```
