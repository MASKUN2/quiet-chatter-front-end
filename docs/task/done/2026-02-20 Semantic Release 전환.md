# 2026-02-20 Semantic Release 전환

## 작업 개요
기존의 `release-please` 기반 릴리스 자동화 방식을 `semantic-release`로 전환하여 보다 정교한 버전 관리와 플러그인 생태계 활용이 가능하도록 개선했습니다.

## 주요 변경 사항

### 1. Semantic Release 도입
- **패키지 설치**: `semantic-release` 및 관련 플러그인(`changelog`, `git`, `github`, `npm`)을 설치했습니다.
- **설정 파일 생성**: `.releaserc.json` 파일을 통해 배포 프로세스(커밋 분석, CHANGELOG 생성, Git 커밋, GitHub Release 생성)를 정의했습니다.

### 2. CI/CD 워크플로우 교체
- **워크플로우 삭제**: 기존 `.github/workflows/release-please.yml`을 제거했습니다.
- **워크플로우 생성**: `.github/workflows/release.yml`을 신규 생성하여 `main` 브랜치 푸시 시 자동 릴리스가 수행되도록 구성했습니다.

### 3. 문서 업데이트
- **커밋 컨벤션 명시**: `docs/guide/code_style_guide.md`에 Conventional Commits 규칙을 추가했습니다.
- **인프라 가이드 갱신**: `docs/guide/infrastructure_guide.md`의 릴리스 관리 섹션을 `semantic-release`로 업데이트했습니다.
- **히스토리 기록**: `docs/project_history.md`에 전환 배경과 결정 사항을 기록했습니다.

## 검증
- `npm run build` 및 `npm run lint` 통과 확인.
- 설정 파일의 문법 및 경로 유효성 확인.
