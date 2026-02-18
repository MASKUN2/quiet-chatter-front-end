# AI Agent Development Guide

이 문서는 AI 에이전트가 Quiet Chatter 프론트엔드 프로젝트의 인프라 및 시스템 연동 방식을 이해하기 위한 가이드라인입니다.

## 1. 프로젝트 프로젝트 개요 및 인프라

- **배포 플랫폼**: Cloudflare Pages (정적 호스팅)
- **스테이징 전략**:
    - **Production**: `https://quiet-chatter.com` (API: `https://api.quiet-chatter.com`)
    - **Development**: `https://dev.quiet-chatter.com` (API: `https://dev-api.quiet-chatter.com`)

## 2. API 연동 및 타입 관리

백엔드 API와 연동되는 기능을 수정하거나 추가할 때는 **OpenAPI 스펙 기반의 타입 안전성**을 최우선으로 합니다.

### 타입 생성 및 업데이트
- **OpenAPI Spec URL**: `https://dev-api.quiet-chatter.com/v1/spec` (최신 작업 반영을 위해 Dev 서버 사용)
- **타입 생성 명령어**: `npm run gen:types`
- **경로 정책**: 모든 API 호출은 버저닝 접두사(예: `/v1`, `/v2` 등)로 시작합니다. 로컬 개발 시에는 `vite.config.ts`의 프록시 설정을 통해 브라우저 요청은 `/api`를 경유하여 해당 버전의 엔드포인트로 전달됩니다.

### 타입 정의 원칙
- 자동 생성된 `src/types/api-schema.d.ts`는 절대 **직접 수정하지 마십시오.**
- 공통 타입은 `src/types/index.ts`에서 생성된 타입을 참조하거나 조합하여 정의합니다.
- `verbatimModuleSyntax` 설정에 따라 타입을 임포트할 때는 반드시 `import type` 구문을 사용하십시오.

## 3. 환경 변수 및 설정 (.env)

배포 및 로컬 실행 시 다음 환경 변수가 필수입니다.
- `VITE_API_BASE_URL`: 로컬 개발 시 `/api` (프록시 연동용). 운영 배포 시에는 비워두거나 실제 도메인을 입력합니다.
- `VITE_NAVER_CLIENT_ID`: 네이버 OAuth 애플리케이션 ID.
- `VITE_NAVER_REDIRECT_URI`: 인증 후 돌아올 콜백 주소.

## 4. 작업 및 검증 프로세스 (Workflow)

작업 완료 후에는 다음 과정을 통해 안정성을 검증해야 합니다.

### A. 타입 동기화 및 빌드 검증
1. `npm run gen:types`를 실행하여 스펙 변경 사항을 확인합니다.
2. `npm run build`를 실행하여 컴파일 에러나 `deprecated` 경고가 없는지 확인합니다.

### B. 코드 품질 검사
- `npm run lint`를 통해 프로젝트 컨벤션 준수 여부를 확인합니다.

### C. 런타임 확인
- `npm run dev` 실행 후 브라우저 콘솔에서 React Warning이나 API 통신 에러가 없는지 확인합니다.

