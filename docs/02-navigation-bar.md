# 상단 내비게이션 바 및 사용자 정보 표시

## 1. 작업 내용
화면 상단에 내비게이션 바(헤더)를 개선하여 현재 접속한 사용자의 정보를 표시합니다. 
모바일 환경에서는 햄버거 메뉴(☰)를 통해 정보를 확인할 수 있도록 반응형으로 구현합니다.

## 2. 구현 방법

### A. API 함수 추가
`src/api/api.ts`에 사용자 정보를 가져오는 함수를 추가합니다.

```typescript
// src/api/api.ts
export async function getMe(): Promise<User> { // User 타입 정의 필요
  return fetch('/api/v1/auth/me').then(handleJsonResponse);
}
```

### B. `Header` 컴포넌트 구조 개선
`src/components/common/Header.tsx`를 수정합니다.

1. **상태 관리**: `useEffect`를 사용하여 컴포넌트 마운트 시 `getMe()`를 호출하고 사용자 정보를 state에 저장합니다.
2. **UI 레이아웃**:
    *   **Desktop**: 헤더 우측 상단에 사용자 닉네임이나 프로필 아이콘을 표시합니다. 익명(Anonymous)인 경우 로그인 버튼을 두거나 빈 공간으로 둡니다.
    *   **Mobile**: 화면 너비가 좁을 경우(MUI `useMediaQuery` 활용), 우측 상단에 햄버거 아이콘(`MenuIcon`)을 표시합니다.

### C. 모바일 메뉴 구현
MUI의 `Menu`와 `MenuItem` 컴포넌트를 사용하여 햄버거 버튼 클릭 시 드롭다운 메뉴가 열리도록 합니다.
메뉴 내용에는 사용자 정보(닉네임, 역할 등)를 표시합니다.

### D. 타입 정의
`src/types/index.ts`에 `User` 인터페이스를 정의합니다.
```typescript
export interface User {
  id: string; // 또는 number
  nickname: string;
  role: string;
  isLogin: boolean;
}
```

## 3. 고려 사항
*   API 호출 실패 시(비로그인 등)에 대한 예외 처리를 통해 UI가 깨지지 않도록 합니다.
*   반응형 디자인(`@media` query 또는 MUI `sx` prop)을 사용하여 모바일과 데스크톱 뷰를 자연스럽게 전환합니다.
