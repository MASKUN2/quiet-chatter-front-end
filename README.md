# Quiet Chatter Front-end

Quiet Chatter 서비스의 웹 프론트엔드 프로젝트입니다.
**"익명성과 휘발성을 결합한, 수줍은 이들을 위한 저자극 독서 나눔 SNS"**라는 가치를 사용자에게 전달하기 위해 편안하고 직관적인 UI/UX를 지향합니다.

URL: https://quiet-chatter.com

## 🛠 기술 스택

- **Core**: React 19, TypeScript, Vite
- **UI Framework**: Material UI (MUI) v6
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Code Quality**: ESLint, Prettier

## 🚀 실행 방법

### 1. 사전 요구사항
- Node.js (v18 이상 권장)
- npm

### 2. 설치
프로젝트 루트 디렉토리에서 의존성을 설치합니다.

```bash
npm install
```

### 3. 개발 서버 실행
로컬 개발 서버를 실행합니다. (기본 포트: 5173)

```bash
npm run dev
```

### 4. 백엔드 API 연동 (Proxy 설정)
개발 시 백엔드 API와의 통신을 위해 `vite.config.ts`에 프록시가 설정되어 있습니다.
기본적으로 `https://api.quiet-chatter.com` (운영 서버)을 바라보도록 설정되어 있으며, 로컬 백엔드 서버를 사용할 경우 타겟을 변경할 수 있습니다.

## 📝 주요 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드 (TypeScript 컴파일 포함)
- `npm run gen:types`: 백엔드 OpenAPI 스펙을 기반으로 TypeScript 타입 자동 생성
- `npm run lint`: 린트 검사

## 📂 문서

AI 에이전트 및 개발자를 위한 가이드 문서는 `docs/guide` 디렉토리에 있습니다.

- [**AI Agent Guide**](docs/guide/ai_agent_guide.md): 에이전트 작업 지침 및 API 연동 가이드
- [Code Style Guide](docs/guide/code_style_guide.md): 코드 스타일 가이드
- [Project History](docs/project_history.md): 개발 히스토리

## 👥 팀

- **개발**: 정인호
- **기획**: 신정원