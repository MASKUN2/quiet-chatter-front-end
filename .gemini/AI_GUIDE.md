# AI Agent Development Guide for Quiet Chatter

이 문서는 Gemini CLI를 포함한 AI 에이전트가 이 프로젝트에서 작업을 수행할 때 반드시 준수해야 하는 API 연동 및 타입 관리 가이드입니다.

## 1. API 작업 전 필수 확인 사항

백엔드 API와 연동되는 기능을 수정하거나 추가할 때는 반드시 최신 OpenAPI 스펙을 먼저 확인해야 합니다.

- **OpenAPI Spec URL**: [https://quiet-chatter.com/api/v1/spec](https://quiet-chatter.com/api/v1/spec)
- **명령어**: `npm run gen:types`

### 작업 절차 (Workflow)

1. **스펙 변경 확인**: 작업을 시작하기 전, 위 URL의 스펙과 현재 `src/types/api-schema.d.ts`의 정의를 비교하거나, 단순히 `npm run gen:types`를 실행하여 변경 사항이 있는지 확인합니다.
2. **타입 업데이트**: 만약 백엔드 스펙이 변경되었다면, `npm run gen:types`를 통해 로컬의 `src/types/api-schema.d.ts`를 최신화합니다.
3. **영향도 분석**: 업데이트된 타입으로 인해 발생하는 컴파일 에러(`npm run build` 실행 권장)를 확인하고, 관련된 API 호출부(`src/api/api.ts`) 및 컴포넌트를 수정합니다.
4. **코드 구현**: 최신화된 타입을 기반으로 비즈니스 로직 및 UI를 구현합니다.

## 2. 타입 정의 원칙

- 자동 생성된 `src/types/api-schema.d.ts`를 직접 수정하지 마십시오.
- 공통으로 사용되는 타입은 `src/types/index.ts`에서 `api-schema.d.ts`의 타입을 참조하여 정의하십시오.
- `verbatimModuleSyntax` 설정에 따라 타입을 임포트할 때는 반드시 `import type` 구문을 사용하십시오.

## 3. 검증 (Verification)

API 관련 변경이 완료된 후에는 반드시 다음 명령어를 실행하여 타입 안정성을 검증해야 합니다.

```bash
npm run build
```

이 가이드는 `docs/04-openapi-integration.md`의 내용을 바탕으로 에이전트의 작업 방식을 규정하기 위해 작성되었습니다.
