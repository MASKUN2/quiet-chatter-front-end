# Changelog

## 1.0.0 (2026-02-20)


### Features

* Add AI development and API integration guides under `.gemini/` directory ([dfbcca4](https://github.com/MASKUN2/quiet-chatter-front-end/commit/dfbcca40b6d25f74470ba05b40b5a362989dd12f))
* Add API proxy configuration to Vite server for local development ([d4e37c8](https://github.com/MASKUN2/quiet-chatter-front-end/commit/d4e37c8dcf103e5b954bcb84813041de7e15a458))
* Add edit and delete functionality for Talk items; adjust components and hooks for user-based actions ([de6f6cb](https://github.com/MASKUN2/quiet-chatter-front-end/commit/de6f6cb5771a5641a19d6f242bd5837722d9e881))
* Add GitHub Actions workflow for Lightsail deployment ([3edc28e](https://github.com/MASKUN2/quiet-chatter-front-end/commit/3edc28eaa573647ff30ed8883eb9e444e4c77751))
* Add navigation bar with user info display and responsive mobile menu ([cd12450](https://github.com/MASKUN2/quiet-chatter-front-end/commit/cd124503d630ef2f0fc6685ee7f65877d8e91705))
* Add OpenAPI TypeScript integration for automatic type generation and API synchronization ([3c53ae5](https://github.com/MASKUN2/quiet-chatter-front-end/commit/3c53ae5d41ec028fea9528d0e76ad89d0b527f39))
* Add responsive design enhancements across components; downgrade MUI dependency for compatibility ([818f115](https://github.com/MASKUN2/quiet-chatter-front-end/commit/818f11594429120d1270428b7973e0558034090b))
* **auth:** migrate to Naver Login SDK and improve guest visibility ([0bd1043](https://github.com/MASKUN2/quiet-chatter-front-end/commit/0bd10438d8a5b11c6f43c04b8a87c08ae4f31e66))
* **auth:** 네이버 OAUTH2 로그인 기능 반영 및 API 경로 수정 ([cdbf9a9](https://github.com/MASKUN2/quiet-chatter-front-end/commit/cdbf9a9724866563a1d727419d6b77ddc4d04cc0))
* Enhance TalkItem UI with metadata and layout improvements ([5046008](https://github.com/MASKUN2/quiet-chatter-front-end/commit/50460087611592cef504d194a5546a959a0886bf))
* Implement talk update and delete functionality ([960f006](https://github.com/MASKUN2/quiet-chatter-front-end/commit/960f006d4e296f716872c8700d33bc75a210e1e3))
* improve user info visibility and handle auth loading state in Header ([bb8074b](https://github.com/MASKUN2/quiet-chatter-front-end/commit/bb8074b309aa544749a9e850b11ada39c4efd52e))
* Introduce AuthContext for user authentication and access management ([49122e3](https://github.com/MASKUN2/quiet-chatter-front-end/commit/49122e3ac71dcb6affac0ce0b8c9e3ce02612f5f))
* Load Pretendard font via CDN in index.html and clean up App.tsx styles ([a858c22](https://github.com/MASKUN2/quiet-chatter-front-end/commit/a858c223c5e8bed66ba79bdd95cd5aaa5390edac))
* Persist user state in localStorage and improve authentication flow ([da8fd75](https://github.com/MASKUN2/quiet-chatter-front-end/commit/da8fd75ea49bd1d77f5029091b8197a762ace57d))
* Update workflow to build and push Docker image to Docker Hub ([75f5a95](https://github.com/MASKUN2/quiet-chatter-front-end/commit/75f5a95aeebe1e38966700d63e1c4fab04644cf7))
* 네이버 로그인 후 회원가입 모달 및 닉네임 설정 기능 추가 ([dea91c4](https://github.com/MASKUN2/quiet-chatter-front-end/commit/dea91c41f9fe8adb0a38441731a14b25e8d8f3bb))
* 로그아웃 기능 추가 및 UI 연동 ([4669a83](https://github.com/MASKUN2/quiet-chatter-front-end/commit/4669a837f0ac72ca1dcde36ee79fa72e7fee73eb))
* 백엔드 dev 스테이지 분리 및 GUEST 제거 반영 ([382d235](https://github.com/MASKUN2/quiet-chatter-front-end/commit/382d2352ccf4ecddbcc63e71037626ea06bb1fc4))


### Bug Fixes

* Naver SDK 대신 수동 OAuth2 URL 요청 방식으로 변경 (인가 코드 흐름 보장) ([acaaa8e](https://github.com/MASKUN2/quiet-chatter-front-end/commit/acaaa8e1f6ffee909e3adc587020b8d0df33401a))
* 네이버 로그인 방식을 Authorization Code Flow로 변경 및 콜백 로깅 강화 ([99612e4](https://github.com/MASKUN2/quiet-chatter-front-end/commit/99612e4114defba0ed8aa26f9abd445ceba9c15d))
* 네이버 로그인 버튼 이미지 URL 수정 ([04fcc43](https://github.com/MASKUN2/quiet-chatter-front-end/commit/04fcc43124f47548d82e3112ec7ca786e4e576ed))
* 네이버 로그인 버튼 이미지 수정 및 HTML 언어 설정(ko) 변경 ([dd35c9a](https://github.com/MASKUN2/quiet-chatter-front-end/commit/dd35c9ad5c96ed7aec38ea098f9c1c568c887ce8))
* 네이버 로그인 화면 한글 강제 설정을 위한 locale 파라미터 추가 ([546075c](https://github.com/MASKUN2/quiet-chatter-front-end/commit/546075cb88a726f4e20b390a0b678881d5fc10eb))
