# AI Agent Development Guide

이 문서는 AI 에이전트가 `quiet-chatter-front-end` 프로젝트를 이해하고 개발을 보조하기 위한 가이드라인입니다.

## 1. 프로젝트 개요

- **목표**: Quiet Chatter의 웹 프론트엔드 인터페이스 구현
- **배포 플랫폼**: Cloudflare Pages (정적 호스팅)
- **스테이징 전략**:
    - **Production**: `https://quiet-chatter.com` (API: `https://api.quiet-chatter.com`)
    - **Development**: 개발 브랜치 배포 (API: `https://dev-api.quiet-chatter.com`)
- **아키텍처**: React Functional Components + Hooks 기반의 SPA (Single Page Application)

## 2. API 연동 가이드 (매우 중요)

백엔드 API와 연동되는 기능을 수정하거나 추가할 때는 **OpenAPI 스펙 기반의 타입 안전성**을 유지해야 합니다.

### 필수 확인 사항
- **OpenAPI Spec URL**: `https://dev-api.quiet-chatter.com/v1/spec` (최신 작업 반영을 위해 Dev 서버 사용)
- **타입 생성 명령어**: `npm run gen:types`
- **경로 정책**: 모든 API 호출은 `/v1`으로 시작합니다. 로컬 개발 시에는 `vite.config.ts`의 프록시 설정을 통해 `/api` 접두사를 사용합니다.

### 환경 변수 (.env)
배포 시 다음 환경 변수가 적절히 설정되어야 합니다.
- `VITE_API_BASE_URL`: 로컬은 `/api`, 운영은 공백 또는 실제 API 도메인.
- `VITE_NAVER_CLIENT_ID`: 네이버 OAuth 클라이언트 식별자.
- `VITE_NAVER_REDIRECT_URI`: 네이버 로그인 콜백 URL (예: `https://quiet-chatter.com/auth/login/naver/callback`).

## 3. 인증 및 권한 정책

- **익명 사용자**: 조용히 읽기만 가능하며, 톡 작성 및 리액션 버튼 클릭 시 로그인이 필요하다는 안내를 제공해야 합니다.
- **로그인 사용자**: 네이버 OAuth를 통해 인증된 사용자이며, 모든 기능을 사용할 수 있습니다.
- **상태 확인**: `AuthContext`의 `user.isLoggedIn` 필드를 통해 인증 여부를 판단합니다.

## 4. 개발 원칙

- **컴포넌트 분리**: 하나의 파일에 너무 많은 로직을 담지 말고, 재사용 가능한 부분은 별도 컴포넌트로 분리합니다.
- **상태 관리**: 전역 상태(`Context API`)는 꼭 필요한 경우(예: 인증 정보)에만 사용하고, 가능한 지역 상태(`useState`)나 커스텀 훅(`useHook`)을 활용합니다.
- **반응형 디자인**: MUI의 `useMediaQuery`나 `sx={{ display: { xs: 'none', md: 'block' } }}` 등을 활용하여 모바일과 데스크톱 환경을 모두 고려합니다.
- **에러 처리**: API 호출 실패 시 사용자에게 적절한 피드백(Alert, Toast 등)을 제공해야 합니다.

## 4. 검증 (Verification)

작업 완료 후에는 다음 과정을 통해 코드 품질과 안정성을 반드시 검증해야 합니다.

### A. 타입 및 빌드 검증
```bash
npm run build
```
- TypeScript 컴파일 에러가 없는지 확인합니다.
- 빌드 로그에 출력되는 **`deprecated` 경고**가 있는지 확인하고, 가능한 최신 API로 교체합니다.

### B. 코드 스타일 및 린트 검사
```bash
npm run lint
```
- ESLint 규칙 위반이 없는지 확인합니다.
- 단순한 포맷팅 문제는 린터가 제안하는 방식을 따르고, 잠재적인 버그(Unused variables 등)를 유발하는 경고는 반드시 수정합니다.

### C. 브라우저 콘솔 확인
- `npm run dev` 실행 후 브라우저 콘솔에 나타나는 React Warning(Key prop 누락, Invalid DOM attribute 등)이나 Deprecation 메시지를 확인하고 해결합니다.

