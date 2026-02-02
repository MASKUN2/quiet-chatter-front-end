# AI Agent Development Guide

이 문서는 AI 에이전트가 `quiet-chatter-front-end` 프로젝트를 이해하고 개발을 보조하기 위한 가이드라인입니다.

## 1. 프로젝트 개요

- **목표**: Quiet Chatter의 웹 프론트엔드 인터페이스 구현
- **아키텍처**: React Functional Components + Hooks 기반의 SPA (Single Page Application)
- **주요 기술 스택**:
    - **Core**: React 19, TypeScript, Vite
    - **UI Framework**: Material UI (MUI) v6
    - **Style**: Emotion (MUI 내부 사용), CSS Modules (필요 시)
    - **API Client**: Axios
    - **Router**: React Router v7

## 2. API 연동 가이드 (매우 중요)

백엔드 API와 연동되는 기능을 수정하거나 추가할 때는 **OpenAPI 스펙 기반의 타입 안전성**을 유지해야 합니다.

### 필수 확인 사항
- **OpenAPI Spec URL**: `https://quiet-chatter.com/api/v1/spec`
- **타입 생성 명령어**: `npm run gen:types`

### 작업 절차 (Workflow)
1. **스펙 변경 확인**: 작업을 시작하기 전 `npm run gen:types`를 실행하여 백엔드 API 변경 사항이 있는지 확인합니다.
2. **타입 업데이트**: 변경 사항이 있다면 로컬의 `src/types/api-schema.d.ts`가 갱신됩니다.
3. **영향도 분석**: 업데이트된 타입으로 인해 발생하는 컴파일 에러(`npm run build` 실행 권장)를 확인하고 수정합니다.
4. **코드 구현**: 최신화된 타입을 기반으로 `src/api/api.ts` 및 관련 컴포넌트를 구현합니다.

### 타입 정의 원칙
- 자동 생성된 `src/types/api-schema.d.ts`는 절대 **직접 수정하지 마십시오.**
- 공통 타입은 `src/types/index.ts`에서 `api-schema.d.ts`를 import하여 재정의하거나 조합하여 사용합니다.

## 3. 개발 원칙

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

