# Code Style Guide

이 문서는 `quiet-chatter-front-end` 프로젝트의 코드 스타일과 작성 원칙을 정의합니다. 일관성 있는 코드를 유지하여 유지보수성과 가독성을 높이는 것을 목표로 합니다.

## 1. 기본 원칙

- **TypeScript 사용**: 모든 파일은 `.ts` 또는 `.tsx` 확장자를 사용하며, `any` 타입 사용을 지양하고 명시적인 타입을 정의합니다.
- **Functional Components**: 모든 컴포넌트는 함수형 컴포넌트(React.FC)로 작성합니다.
- **ESLint/Prettier**: 프로젝트에 설정된 린트 규칙을 준수합니다.

## 2. 네이밍 컨벤션 (Naming Convention)

- **컴포넌트 파일**: PascalCase를 사용합니다. (예: `BookList.tsx`, `Header.tsx`)
- **함수 및 변수**: camelCase를 사용합니다. (예: `handleSearch`, `fetchBooks`, `isLoading`)
- **인터페이스 및 타입**: PascalCase를 사용합니다. (예: `Book`, `MemberResponse`)
- **상수**: `const`로 선언된 상수는 camelCase를 원칙으로 하되, 설정값이나 불변 상수는 UPPER_SNAKE_CASE를 허용합니다.

## 3. 개발 및 설계 원칙

### 컴포넌트 설계
- **관심사 분리**: 하나의 파일에 너무 많은 로직을 담지 마십시오. 재사용 가능한 UI는 컴포넌트로, 복잡한 비즈니스 로직은 커스텀 훅(`useHook`)으로 분리합니다.
- **반응형 디자인**: MUI의 `useMediaQuery`나 `sx` prop의 Breakpoint 객체를 활용하여 모바일 우선 디자인을 적용합니다.

### 상태 관리 전략
- **지역 상태 (`useState`)**: 컴포넌트 내부에서만 쓰이는 상태에 우선적으로 사용합니다.
- **전역 상태 (`Context API`)**: 앱 전반에 걸쳐 공유가 필요한 정보(예: 인증 정보)에만 제한적으로 사용합니다.
- **URL 상태 (`useSearchParams`)**: 검색어, 페이지 번호 등 공유 가능한 상태는 URL 파라미터를 진실의 원천(Source of Truth)으로 삼습니다.

### 에러 처리 (Error Handling)
- API 호출 실패 시 사용자에게 적절한 피드백(Alert, Toast 등)을 제공해야 합니다.
- 비즈니스 로직 에러는 백엔드에서 내려오는 메시지를 그대로 보여주는 것을 기본으로 합니다.

## 4. 컴포넌트 구조 (Component Structure)

```tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
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

  // 3. Render
  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
      {/* ... */}
    </Box>
  );
};

export default ComponentName;
```

## 5. API 호출 및 비동기 처리

- API 호출 로직은 컴포넌트 내부에 직접 작성하지 않고, `src/api/api.ts`에 정의된 함수를 import하여 사용합니다.
- 복잡한 데이터 페칭 로직(무한 스크롤 등)은 `src/hooks/` 폴더 내에 별도 훅으로 분리합니다.

## 6. 커밋 컨벤션 (Commit Convention)

자동화된 릴리스 및 버전 관리를 위해 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 준수합니다.

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- **refactor**: 코드 리팩토링
- **test**: 테스트 코드 추가 및 수정
- **chore**: 빌드 프로세스나 패키지 매니저 설정 변경 등
- **ci**: CI 설정 파일 및 스크립트 수정

**형식**: `<type>(<scope>): <subject>` (scope는 생략 가능)
예시: `feat(auth): 네이버 로그인 연동 추가`
