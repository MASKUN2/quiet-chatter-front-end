# AI 에이전트 작업 지침

본 문서는 AI 에이전트가 `quiet-chatter-front-end` 프로젝트에서 작업을 수행하기 전 반드시 확인해야 할 진입점입니다.

## 0. 프로젝트 현황 요약
- **플랫폼**: React + TypeScript + Vite (Cloudflare Pages 배포)
- **백엔드 스테이징**: `dev-api.quiet-chatter.com` (개발/테스트용), `api.quiet-chatter.com` (운영용)
- **API 정책**: `/v1` 기반 경로 사용 (GUEST 로그인 폐지, 네이버 로그인 중심)

## 1. 필수 확인 문서

작업을 시작하기 전에 아래 가이드 문서를 먼저 숙지하십시오.

- **[AI Agent Development Guide](docs/guide/ai_agent_guide.md)**: 프로젝트 개요, API 연동 절차, 작업 원칙
- **[Code Style Guide](docs/guide/code_style_guide.md)**: 코드 포맷팅, 네이밍 컨벤션, 컴포넌트 구조
- **[Project Structure](docs/guide/project_structure.md)**: 폴더 구조 및 아키텍처 설명

## 2. 작업 절차 요약

1. **문서 확인**: 위 링크된 문서들을 통해 프로젝트의 컨텍스트와 규칙을 파악합니다.
2. **상태 파악**: `npm install` 및 `npm run dev`를 통해 프로젝트가 정상적으로 실행되는지 확인합니다.
3. **API 동기화**: 백엔드 API와 연동되는 작업인 경우, 반드시 `npm run gen:types`를 실행하여 타입을 최신화합니다.
4. **구현 및 테스트**: 가이드라인을 준수하여 기능을 구현하고, `npm run build`를 통해 빌드 오류가 없는지 검증합니다.
