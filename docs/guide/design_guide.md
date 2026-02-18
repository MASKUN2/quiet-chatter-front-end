# Design Guide

이 문서는 `quiet-chatter-front-end` 프로젝트의 시각적 언어와 디자인 원칙을 정의합니다. 일관된 사용자 경험(UX)과 브랜드 아이덴티티를 유지하기 위해 다음 가이드를 준수합니다.

## 1. 디자인 철학
- **익명성과 휘발성**: 사용자가 부담 없이 참여할 수 있도록 차분하고 정적인 톤을 유지합니다.
- **가독성 중심**: 텍스트(북톡) 중심의 서비스이므로 가독성이 높은 폰트와 충분한 여백을 사용합니다.
- **반응형 최적화**: 모바일 사용자가 많은 서비스 특성상, 모든 컴포넌트는 모바일 환경에서 먼저 고려됩니다.

## 2. 컬러 팔레트 (Color Palette)

### 메인 컬러 (Primary)
프로젝트의 정체성을 나타내는 핵심 색상입니다.
- **Deep Violet**: `#5c2d91` (기본 버튼, 텍스트 하이라이트)
- **Deep Indigo**: `#4b0082` (호버 상태, 강조)
- **Light Violet**: `rgba(92, 45, 145, 0.04)` (버튼 배경 효과)

### 배경 및 텍스트 (Background & Text)
- **Default Background**: `#f8f9fa` (전체 앱 배경)
- **Paper Background**: `#ffffff` (카드, 모달, 섹션 배경)
- **Text Primary**: `rgba(0, 0, 0, 0.87)` (주요 본문)
- **Text Secondary**: `rgba(0, 0, 0, 0.6)` (설명, 저자 정보, 날짜)
- **Border**: `#eee` 또는 `grey.200` (구분선, 약한 테두리)

## 3. 타이포그래피 (Typography)
기본 폰트는 **Pretendard**를 사용하며, CDN을 통해 로드됩니다.

- **Heading (h4)**: 1.75rem (28px), Bold - 페이지 제목
- **Sub-heading (h5/h6)**: 1.25rem ~ 1.125rem, Semi-bold - 섹션 제목, 책 제목
- **Body 1**: 1rem (16px), Regular - 기본 본문, 톡 내용
- **Body 2**: 0.875rem (14px) - 보조 정보, 리스트 항목
- **Caption**: 0.75rem (12px) - 날짜, 작은 메타데이터

## 4. 공통 UI 패턴 (Common UI Patterns)

### 카드 및 컨테이너
- **Shadow**: `elevation={1}`을 기본으로 사용하며, 모바일에서는 플랫하게(`elevation={0}`) 처리하기도 합니다.
- **Border Radius**: 
  - 일반 컨테이너: `2` (8px)
  - 이미지 및 작은 요소: `1` (4px)
- **Spacing**: MUI의 `spacing` 시스템을 따르며, 기본 간격은 8px의 배수를 사용합니다. (`p: 2` = 16px)

### 인터랙션
- **Buttons**: `textTransform: 'none'` 설정을 통해 대문자 변환을 방지하고 원래 텍스트를 유지합니다.
- **Hover**: 마우스 오버 시 색상이 짙어지거나 투명한 배경색이 나타나는 피드백을 제공합니다.

## 5. 아이콘 (Icons)
Material UI의 공식 아이콘 세트(`@mui/icons-material`)를 사용합니다.
- 계정 정보: `AccountCircle`
- 시간: `AccessTime`
- 리액션: `ThumbUp`, `Favorite`
- 검색: `Search`
