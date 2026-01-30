# OpenAPI TypeScript 통합 가이드

이 문서는 `openapi-typescript`를 사용하여 백엔드 API 스펙(OpenAPI/Swagger)으로부터 TypeScript 인터페이스를 자동으로 생성하고, API 변경 사항을 프론트엔드 코드에 신속하게 반영하기 위한 지침입니다.

## 1. 개요
백엔드 API 스펙이 변경될 때마다 프론트엔드의 타입을 수동으로 수정하는 것은 번거롭고 실수하기 쉽습니다. 이 가이드를 통해 원격 JSON 스펙을 읽어 타입을 자동 생성함으로써 타입 안전성을 높이고 개발 생산성을 향상시킬 수 있습니다.

## 2. 초기 설정 (Setup)

### 2.1 패키지 설치
`openapi-typescript`를 개발 의존성(`devDependencies`)으로 설치합니다.

```bash
npm install -D openapi-typescript typescript
```

### 2.2 스크립트 추가
`package.json` 파일의 `scripts` 섹션에 타입을 생성하는 명령어를 추가합니다.

```json
{
  "scripts": {
    "gen:types": "openapi-typescript https://quiet-chatter.com/api/v1/spec -o src/types/api-schema.d.ts"
  }
}
```
*   **URL**: `https://quiet-chatter.com/api/v1/spec` (현재 프로젝트의 API 스펙 주소)
*   **Output**: `src/types/api-schema.d.ts` (생성된 타입 파일이 저장될 위치)

## 3. 사용 방법 (Usage)

### 3.1 타입 생성 및 업데이트
백엔드 API가 변경되었거나 최신 스펙을 반영하고 싶을 때 아래 명령어를 실행합니다.

```bash
npm run gen:types
```
명령어가 성공적으로 실행되면 `src/types/api-schema.d.ts` 파일이 생성되거나 갱신됩니다.

### 3.2 코드에서 활용하기
생성된 타입 파일은 `paths`, `components` 등의 네임스페이스를 포함합니다. 이를 활용하여 프론트엔드 모델 타입을 정의합니다.

**예시 (`src/types/index.ts`):**

```typescript
import type { paths, components } from './api-schema';

// API 스키마에서 직접 타입 추출
export type Book = components['schemas']['BookResponse']; // 실제 스키마 이름에 맞춰 수정 필요
export type Talk = components['schemas']['TalkResponse'];

// API 응답 타입 활용
export type BookListResponse = paths['/api/v1/books']['get']['responses'][200]['content']['application/json'];
```

## 4. API 변경 감지 및 대응 프로세스

1.  **백엔드 변경 알림**: 백엔드 팀으로부터 API 변경 사항이 배포되었다는 소식을 듣습니다.
2.  **타입 갱신**: `npm run gen:types`를 실행하여 로컬의 타입 정의를 최신화합니다.
3.  **컴파일 에러 확인**: TypeScript 컴파일러(`tsc` 또는 IDE의 검사 기능)를 통해 기존 코드에서 타입 불일치 에러가 발생하는지 확인합니다.
4.  **코드 수정**: 변경된 API 스펙에 맞춰 컴포넌트나 비즈니스 로직을 수정합니다.

## 5. 팁 (Tips)

*   **Git 관리**: 생성된 `src/types/api-schema.d.ts` 파일은 Git 저장소에 커밋하여 팀원들과 동일한 타입 정의를 공유하는 것이 좋습니다.
*   **Pre-commit Hook**: (선택 사항) `husky` 등을 사용하여 커밋 전에 API 스펙 변경 여부를 체크하거나 타입을 재생성하도록 설정할 수 있습니다.
