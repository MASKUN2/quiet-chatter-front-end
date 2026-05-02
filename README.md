# Quiet Chatter Front-end

Quiet Chatter 서비스의 웹 프론트엔드 프로젝트입니다.
**"익명성과 휘발성을 결합한, 수줍은 이들을 위한 저자극 독서 나눔 SNS"**라는 핵심 가치를 사용자에게 온전히 전달하기 위해 편안하고 직관적인 UI/UX를 지향합니다.

🌐 **라이브 서비스**: [quiet-chatter.com](https://quiet-chatter.com)

## 🛠 기술 스택

- **Core**: React 19, TypeScript, Vite
- **State Management**: Zustand
- **UI Framework**: Material UI (MUI) v6
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Mocking**: Mock Service Worker (MSW)
- **Deployment**: Cloudflare Pages

---

## 🚀 시작하기

### 1. 사전 요구사항
- Node.js (v18 이상 권장)
- npm

### 2. 설치
프로젝트 루트 디렉토리에서 패키지 의존성을 설치합니다.
```bash
npm install
```

### 3. 로컬 서버 실행
API 요청을 백엔드로 프록시(Proxy) 하는 로컬 개발 서버를 실행합니다.
```bash
npm run dev
```
> **Tip**: 백엔드 서버 없이 UI만 테스트하고 싶다면, `npm run dev:mock` 명령어를 통해 MSW 모의 서버를 활용할 수 있습니다.

---

## 📝 주요 스크립트 모음

| 명령어 | 설명 |
| :--- | :--- |
| `npm run dev` | 로컬 개발 프록시 서버 실행 |
| `npm run dev:mock` | 로컬 개발 오픈 + MSW 기반 Mock 서버 켜기 (백엔드 미연결 시 사용) |
| `npm run gen:types` | 백엔드 OpenAPI 스펙을 기반으로 `api-schema.d.ts` 최신 타입 자동 생성 |
| `npm run lint` | ESLint 기반 코드 퀄리티 검사 |
| `npm run build` | 프로덕션 환경을 위한 빌드 (TypeScript 컴파일 포함) |

---

## 📚 개발자 및 AI 에이전트 가이드

**프로젝트에 기여하거나 AI 에이전트를 활용하기 전, 반드시 다음 가이드 문서를 확인하세요.**

모든 필수 작업 원칙과 규약은 [**AGENTS.md**](./AGENTS.md) 문서에 종합되어 있습니다. 이 파일이 프로젝트의 **진입점(Entry Point)** 역할을 합니다. 목적에 따라 분리된 세부 가이드는 `docs/guide/` 폴더에서 확인할 수 있습니다.

- 🏛️ **[Architecture Guide](docs/guide/architecture_guide.md)**: React 컴포넌트 구조, 상태 관리, API 흐름 가이드
- 🚀 **[Workflow Guide](docs/guide/workflow_guide.md)**: 로컬 셋업, 테스트, Git Commit 컨벤션 가이드
- 🎨 **[Design Guide](docs/guide/design_guide.md)**: 색상, 타이포그래피, 간격, MUI 스타일 가이드
- 📝 **[Code Style Guide](docs/guide/code_style_guide.md)**: 네이밍 컨벤션 및 린트 규칙
- 🔐 **[Auth Guide](docs/guide/auth_guide.md)**: 네이버 OAuth 연동 및 권한 처리 가이드
- 📂 **[Project Structure](docs/guide/project_structure.md)**: 프로젝트 폴더 및 파일 트리 구조도

> **Shared Docs**: 전체 서비스 기획 및 개발 히스토리는 [quiet-chatter-docs 레포지토리](https://github.com/maskun2/quiet-chatter-docs)를 참고하세요.

---

## 👥 팀 구성 정보

- **프론트/백엔드 개발**: 정인호 (Inho Jeong)
- **프로덕트 기획/UX**: 신정원 (Jungwon Shin)