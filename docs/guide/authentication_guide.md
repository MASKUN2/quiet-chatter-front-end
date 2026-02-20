# Authentication Guide

이 문서는 Quiet Chatter 프로젝트의 인증 체계와 멤버 권한 정책을 정의합니다.

## 1. 멤버 체계 (Member Roles)

프로젝트는 백엔드의 멤버 체계와 동일하게 다음 두 가지 상태를 가집니다.

- **익명 사용자 (Anonymous)**: 로그인하지 않은 상태. `member.isLoggedIn`이 `false`입니다.
- **인증된 멤버 (Member)**: 네이버 OAuth를 통해 로그인한 상태. `REGULAR` 또는 `MANAGER` 역할을 가집니다.

## 2. 권한 정책 (Authorization Policy)

### 읽기 권한
- 익명 사용자를 포함한 모든 사용자는 도서 검색, 도서 상세 정보, 북톡 목록 및 추천 북톡을 조회할 수 있습니다.

### 쓰기/수정 권한
- **북톡 작성 및 리액션**: 반드시 로그인(`isLoggedIn: true`)이 필요합니다. 비로그인 사용자가 시도할 경우 로그인 유도 UI를 노출하거나 안내 메시지를 띄워야 합니다.
- **수정 및 삭제**: 해당 컨텐츠를 작성한 본인(Member ID 일치)만 가능합니다.

## 3. 인증 흐름 (Auth Flow)

### 로그인 (Login)
- 네이버 OAuth 2.0 코드를 통해 인증을 수행합니다.
- 프론트엔드 콜백 페이지(`/auth/login/naver/callback`)에서 서버 API를 호출하여 세션을 확립합니다.

### 로그아웃 (Logout)
- `AuthContext`의 `logout` 함수를 호출합니다.
- 서버 세션(쿠키)을 만료시키고, 로컬 스토리지의 `auth_member` 캐시를 즉시 삭제합니다.

### 상태 유지
- 앱 초기화 시 현재 버전의 인증 확인 API(예: `/v1/auth/me`)를 호출하여 현재 세션의 유효성을 검증하고 전역 상태를 업데이트합니다.
- 액세스 토큰 만료 시 리프레시 토큰을 통해 백그라운드에서 자동으로 갱신(Silent Refresh)됩니다.

## 4. 구현 가이드

- **상태 접근**: `useAuth()` 훅을 사용하여 `member` 객체에 접근합니다.
- **권한 체크 예시**:
  ```tsx
  const { member } = useAuth();
  if (!member?.isLoggedIn) {
    // 로그인 유도 로직
  }
  ```
