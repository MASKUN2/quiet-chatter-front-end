# Project Structure Guide

`quiet-chatter-front-end` 프로젝트의 폴더 구조와 각 디렉토리의 역할을 설명합니다.

## 디렉토리 구조

```
quiet-chatter-front-end/
├── .gemini/             # AI 에이전트 관련 설정 및 히스토리
├── docs/                # 프로젝트 문서 (기능 명세, 가이드 등)
│   └── guide/           # 개발 가이드 문서
├── public/              # 정적 리소스 (이미지, 아이콘, favicon 등)
├── src/                 # 소스 코드
│   ├── api/             # 백엔드 API 호출 함수 모음
│   ├── assets/          # 소스 내에서 import하여 사용하는 에셋 (svg 등)
│   ├── components/      # UI 컴포넌트
│   │   ├── book/        # 도서 관련 컴포넌트 (검색 결과, 상세 정보, 톡 작성 등)
│   │   ├── common/      # 공통 컴포넌트 (헤더, 모달, 레이아웃 등)
│   │   └── home/        # 홈 화면 전용 컴포넌트 (추천 톡, 업데이트 로그 등)
│   ├── context/         # 전역 상태 관리 (AuthContext 등)
│   ├── hooks/           # 커스텀 React Hooks (비즈니스 로직 분리)
│   ├── pages/           # 라우트 페이지 컴포넌트 (Home, BookSearch, BookDetail)
│   ├── types/           # TypeScript 타입 정의
│   │   ├── api-schema.d.ts # OpenAPI Generator로 자동 생성된 타입
│   │   └── index.ts        # 공통으로 사용되는 타입 정의
│   ├── App.tsx          # 메인 앱 컴포넌트 (라우팅 및 테마 설정)
│   └── main.tsx         # 진입점 (Entry Point)
└── ...
```

## 주요 디렉토리 설명

### `src/api`
백엔드 서버와 통신하는 모든 함수가 위치합니다. `axios` 인스턴스를 설정하고, 엔드포인트별 요청 함수를 export합니다.

### `src/components`
재사용 가능한 UI 요소를 관리합니다.
- **book**: 책 검색, 상세 조회, 톡 리스트 등 책 도메인과 관련된 컴포넌트들입니다.
- **common**: 헤더, 푸터, 공통 모달 등 애플리케이션 전반에서 쓰이는 컴포넌트입니다.

### `src/hooks`
컴포넌트에서 비즈니스 로직을 분리하기 위해 커스텀 훅을 사용합니다.
- 예: `useBookSearch.ts`는 검색어 상태 관리, API 호출, 무한 스크롤 로직 등을 담당하고, 컴포넌트는 UI 렌더링에만 집중하게 합니다.

### `src/pages`
라우팅(`react-router-dom`)의 대상이 되는 페이지 단위 컴포넌트입니다. 주로 여러 컴포넌트를 조합하여 하나의 화면을 구성합니다.

### `src/types`
- **`api-schema.d.ts`**: `npm run gen:types` 명령어로 자동 생성되는 파일입니다. 백엔드 DTO와 1:1 매핑됩니다.
- **`index.ts`**: 프론트엔드에서 사용하기 편하게 타입을 가공하거나 재정의한 파일입니다.
