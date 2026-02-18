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

## 3. 컴포넌트 구조 (Component Structure)

```tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import type { SomeType } from '../../types'; // 타입 import 시 type 키워드 사용

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

## 4. API 호출 및 비동기 처리

- API 호출 로직은 컴포넌트 내부에 직접 작성하지 않고, `src/api/api.ts`에 정의된 함수를 import하여 사용합니다.
- 복잡한 데이터 페칭 로직은 `src/hooks/` 폴더 내에 커스텀 훅(예: `useBookSearch.ts`)으로 분리합니다.
