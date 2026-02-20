# AI Agent Development Guide

이 문서는 AI 에이전트가 `quiet-chatter-front-end` 프로젝트에서 작업을 수행할 때 반드시 준수해야 하는 **에이전트 전용 작업 지침**입니다. 일반적인 코드 스타일이나 설계 원칙은 별도의 가이드 문서를 참조하십시오.

## 1. 계획 및 설계 원칙 (Planning Principles)

AI 에이전트는 작업을 시작하기 전, 반드시 다음 원칙에 따라 실행 계획을 수립하고 개발자의 승인을 받아야 합니다.

- **단일 경로 제시**: "A 또는 B"와 같은 모호한 선택지를 배제하고, 현재 구조에서 가장 적합한 **단 하나의 구체적인 구현 경로**를 결정하여 명시하십시오.
- **결정적 가이드**: 기술적인 의사결정(예: 특정 라이브러리 활용 여부, 컴포넌트 위치 등)을 계획 단계에서 확정하여 개발자가 즉시 검토할 수 있게 하십시오.
- **업계 표준 준수**: 모던 React 및 TypeScript의 관례를 따르되, 상세한 스타일은 [**Code Style Guide**](code_style_guide.md) 및 [**Design Guide**](design_guide.md)의 원칙을 최우선으로 적용하십시오.

## 2. API 연동 및 타입 동기화 (Essential)

백엔드 API와 연동되는 기능을 수정하거나 추가할 때는 **OpenAPI 스펙 기반의 타입 안전성**을 유지하는 것이 가장 중요합니다.

### 필수 확인 사항
- **OpenAPI Spec URL**: [https://quiet-chatter.com/api/v1/spec](https://quiet-chatter.com/api/v1/spec)
- **타입 생성 명령어**: `npm run gen:types`

### 작업 절차 (Workflow)
1. **스펙 확인**: `npm run gen:types`를 실행하여 백엔드 API 변경 사항을 로컬에 반영합니다.
2. **영향도 분석**: `src/types/api-schema.d.ts`의 변경으로 인해 발생하는 컴파일 에러를 확인합니다.
3. **코드 구현**: 최신화된 타입을 기반으로 `src/api/api.ts` 및 관련 컴포넌트를 수정하십시오. **자동 생성된 타입 파일은 절대 직접 수정하지 마십시오.**

## 3. 관련 가이드 준수 (Delegation)

에이전트는 다음 문서들에 정의된 세부 규칙을 반드시 숙지하고 작업에 반영해야 합니다.

- [**Code Style Guide**](code_style_guide.md): 컴포넌트 구조, 네이밍 컨벤션, 상태 관리 및 에러 처리 원칙.
- [**Infrastructure Guide**](infrastructure_guide.md): 도메인 정보(운영/개발), API 스테이징 및 버저닝 정책.
- [**Design Guide**](design_guide.md): MUI 활용 방식, 컬러 팔레트, 반응형 디자인 레이아웃 규칙.
- [**Authentication Guide**](authentication_guide.md): 멤버 역할(Anonymous/Member) 및 권한 정책.
- [**Project Structure**](project_structure.md): 디렉토리 역할 및 파일 위치 선정 기준.

## 4. 최종 검증 (Verification)

모든 작업 완료 후 에이전트는 다음 과정을 통해 결과물을 스스로 검증해야 합니다.

1. **빌드 테스트**: `npm run build` 실행 시 타입 에러나 경고가 없는지 확인.
2. **린트 검사**: `npm run lint` 실행 시 컨벤션 위반이 없는지 확인.
3. **런타임 확인**: `npm run dev` 실행 후 브라우저 콘솔의 경고나 API 통신 오류 여부 점검.
