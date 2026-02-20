# Infrastructure & Staging Guide

이 문서는 Quiet Chatter 프론트엔드 프로젝트의 인프라 구조와 스테이징(운영/개발) 환경 정보를 정의합니다.

## 1. 도메인 및 스테이징 정보 (Staging Strategy)

### Production (운영)
- **Frontend**: [https://quiet-chatter.com](https://quiet-chatter.com)
- **Backend API**: [https://api.quiet-chatter.com](https://api.quiet-chatter.com)
- **배포 플랫폼**: Cloudflare Pages (`main` 브랜치 자동 배포)
- **릴리스 관리**: `semantic-release`를 통해 자동 버전 업그레이드 및 `CHANGELOG.md` 생성

### Development (개발)
- **Frontend**: [https://dev.quiet-chatter.com](https://dev.quiet-chatter.com)
- **Backend API**: [https://dev-api.quiet-chatter.com](https://dev-api.quiet-chatter.com)
- **배포 플랫폼**: Cloudflare Pages (`dev` 브랜치 자동 배포)

## 2. API 버저닝 및 경로 (API Versioning)

- **버저닝 전략**: URI Path Versioning을 사용합니다.
- **현재 버전**: `/v1` (예: `GET /v1/talks`)
- **주의 사항**: API 경로의 `/v1`은 단순한 접두사가 아니라 리소스의 버전을 의미합니다. 새로운 버전 도입 시 해당 경로가 변경될 수 있음을 고려하여 설계하십시오.

## 3. 로컬 개발 환경 (Local Development)

- **API 프록시**: 로컬 개발 서버(`npm run dev`) 실행 시, 브라우저의 `/api` 요청은 `vite.config.ts`에 설정된 타겟 API 서버로 프록시됩니다.
- **환경 변수 (`.env`)**:
    - `VITE_API_BASE_URL`: 로컬 개발 시 `/api`로 설정하여 프록시를 경유하게 합니다.
    - 실제 운영/개발 빌드 시에는 각각의 API 서버 주소가 적용됩니다.
