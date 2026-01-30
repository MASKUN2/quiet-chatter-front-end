# 책 검색 무한 스크롤 구현

## 1. 작업 내용
현재 "더 보기" 버튼을 클릭하여 다음 페이지의 책 목록을 불러오는 방식을, 사용자가 스크롤을 내려 리스트의 하단에 도달했을 때 자동으로 다음 데이터를 불러오는 "무한 스크롤" 방식으로 변경합니다.

## 2. 구현 방법

### A. Intersection Observer API 활용
브라우저의 `IntersectionObserver` API를 사용하여 스크롤이 리스트의 마지막 요소(또는 하단 감지 영역)에 도달했는지 감지합니다.

### B. `useBookSearch` Hook 수정
`src/hooks/useBookSearch.ts`를 수정하여 관찰 로직을 추가합니다.

1. **Observer Ref 추가**: 마지막 요소를 참조할 `useRef`와 `useCallback`을 생성합니다.
2. **Intersection Handler**: 관찰 대상이 화면에 들어오면(`isIntersecting`), `loadMore` 함수를 호출하도록 로직을 작성합니다.
3. **상태 관리**: 데이터 로딩 중(`loading`)이거나 더 이상 데이터가 없는 경우(`sliceInfo.last`)에는 관찰 로직이 실행되지 않도록 방어 코드를 추가합니다.

### C. `BookSearch` 컴포넌트 수정
`src/pages/BookSearch.tsx`의 UI를 업데이트합니다.

1. **Target Element**: 리스트의 가장 마지막 아이템 혹은 리스트 하단에 보이지 않는 `div` 요소를 배치하고, `useBookSearch`에서 만든 `ref`를 연결합니다.
2. **버튼 제거**: 기존의 "더 보기" 버튼을 제거합니다.
3. **로딩 인디케이터**: 데이터를 불러오는 동안 하단에 스피너나 스켈레톤 UI가 표시되도록 유지합니다.

## 3. 예상 코드 스니펫

```typescript
// useBookSearch.ts 예시
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
