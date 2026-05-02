# AI Agent Task Instructions

QuietChatter 프론트엔드 프로젝트에 오신 것을 환영합니다. 이 문서는 에이전트가 코드를 작성, 스타일링 및 검토하는 방법을 정의합니다.

작업을 시작하기 전, docs/guide/ 폴더 내의 관련 가이드 문서를 반드시 확인하십시오.

## 1. 프로젝트 개요
- 핵심 기술: React, TypeScript, Vite (Cloudflare Pages 배포)
- UI 프레임워크: Material UI (MUI) Version 6
- 상태 관리: Zustand
- 환경:
    - 프론트엔드: dev.quiet-chatter.com (Dev) -> quiet-chatter.com (Prod)
    - 백엔드 API: dev-api.quiet-chatter.com (Dev) -> api.quiet-chatter.com (Prod)
- API 상세: 모든 실제 API 호출은 /api 베이스 경로를 사용합니다. API 규칙의 단일 소스는 OpenAPI 스펙입니다.

## 2. 설계 원칙
작업 수행 시 다음 규칙을 준수하십시오:
- 업계 표준 사용: 널리 사용되고 신뢰할 수 있는 대중적인 솔루션을 제안하십시오.
- 단일 경로 제안: 여러 대안을 제시하기보다 가장 적합한 하나의 방안을 선택하고 그 이유를 명확히 설명하십시오.

## 3. 필수 참조 문서
- 아키텍처 가이드 (docs/guide/architecture_guide.md): React 컴포넌트, 앱 레이아웃, 상태 관리 및 데이터 훅 규칙.
- 디자인 및 스타일 가이드 (docs/guide/design_guide.md): 색상, 타이포그래피, 간격 및 MUI 컴포넌트 규칙.
- 코드 스타일 가이드 (docs/guide/code_style_guide.md): 명명 규칙, TypeScript 규칙 및 포맷팅 로직.
- 인증 가이드 (docs/guide/auth_guide.md): 네이버 OAuth 동작 방식, 로그인 상태 확인 및 UI 보호 규칙.
- 워크플로우 가이드 (docs/guide/workflow_guide.md): 로컬 서버 실행, API 모킹, 빌드 테스트 및 Git 커밋 방법.
- 프로젝트 구조 (docs/guide/project_structure.md): src/ 디렉토리 내의 파일 및 폴더 맵.

## 4. 에이전트 작업 지침

모든 작업 시작 전 및 작업 중에 superpowers 스킬 목록을 항상 확인하고 상황에 맞는 스킬을 활성화하여 사용하십시오.

### A. 공통 원칙
- 모든 서비스는 헥사고날 아키텍처를 따르며, 어댑터 패키지 명칭은 adaptor로 통일합니다.
- 마크다운 작성 시 강조 서식(bold, italics)과 이모티콘 사용을 절대 금지합니다.
- API 통합이나 코드 커밋 전에는 반드시 워크플로우 가이드를 참조하십시오.
