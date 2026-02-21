# Design Guide

This document defines the visual language and design principles for the `quiet-chatter-front-end` project. We adhere to the following guide to maintain a consistent user experience (UX) and brand identity.

## 1. Design Philosophy
- **Anonymity and Ephemerality**: Maintain a calm and static tone so users can participate without burden.
- **Readability Focused**: As a text-centric (BookTalk) service, use highly readable fonts and ample whitespace.
- **Responsive Optimization**: Given the nature of the service with many mobile users, all components are considered for the mobile environment first.

## 2. Color Palette

### Primary Colors
Core colors representing the project's identity.
- **Deep Violet**: `#5c2d91` (Primary buttons, text highlights, overline labels)
- **Deep Indigo**: `#4b0082` (Hover states, emphasis)
- **Light Violet**: `rgba(92, 45, 145, 0.04)` (Button background effects)
- **Highlight Tint**: `rgba(92, 45, 145, 0.07~0.12)` (Inline text highlight backgrounds)

### Background & Text
- **Default Background**: `#f8f9fa` (Overall app background)
- **Paper Background**: `#ffffff` (Cards, modals, section backgrounds)
- **Text Primary**: `rgba(0, 0, 0, 0.87)` (Primary body text)
- **Text Secondary**: `rgba(0, 0, 0, 0.6)` (Descriptions, author info, dates)
- **Border**: `#eee` or `grey.200` (Dividers, light borders)

## 3. Typography
The default font is **Pretendard**, loaded via CDN.

### Scale
- **Heading (h2)**: Used only for hero/brand pages (e.g., About). Gradient text + `fontWeight: 900`.
- **Heading (h4/h5)**: Page and section titles. `fontWeight: 800`, `letterSpacing: '-0.02em'`.
- **Sub-heading (h6)**: Sub-section titles. `fontWeight: 800`, `letterSpacing: '-0.01em'`.
- **Body 1**: 1rem (16px), Regular - Primary body text, Talk content. `lineHeight: 1.6~2.2`.
- **Body 2**: 0.875rem (14px) - Secondary info, list items.
- **Caption**: 0.75rem (12px) - Dates, small metadata.

### Section Header Pattern (Standard)
Every named section in the UI **must** use the following two-line header pattern:

```tsx
<Typography variant="overline" sx={{
  color: 'primary.main',
  fontWeight: 800,
  letterSpacing: '0.2em',
  fontSize: '0.75rem',
  display: 'block',
  lineHeight: 1.4
}}>
  SECTION LABEL   {/* Always uppercase English */}
</Typography>
<Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mt: 0.5 }}>
  섹션 제목
</Typography>
```

**Applied examples:**
| Page / Component | Overline | Title |
|---|---|---|
| Home | `FOR YOU` | 당신을 위한 북톡 |
| BookDetail (Talks) | `BOOK TALK` | Talks |
| BookInfo (description) | `ABOUT THIS BOOK` | 책 소개 |
| BookSearch | `SEARCH RESULTS` | "{keyword}" 검색 결과 |
| TermsOfService | `LEGAL` | 이용약관 및 개인정보처리방침 |
| AboutService sections | `OUR PHILOSOPHY` / `KEY FEATURES` | 각 섹션 |

### Gradient Headline (Brand/Info Pages Only)
For marketing or information pages (e.g., `AboutService`), the hero headline may use a gradient:

```tsx
<Typography variant="h2" sx={{
  fontWeight: 900,
  background: 'linear-gradient(135deg, #5c2d91 0%, #a29bfe 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.04em',
}}>
  ...
</Typography>
```

> **Note**: Do NOT use gradient text on data-centric pages (lists, search results, detail views).

## 4. Global Layout & Spacing
To ensure visual consistency, the overall structure and spacing of the application are centralized in `src/App.tsx`.

### App Layout Structure
The root of every page follows this hierarchy:
1. **Flex Wrapper**: `Box` with `flexDirection: column` and `minHeight: 100vh`.
2. **Main Container**: `<Container maxWidth="md" disableGutters={isMobile}>`.
3. **Spacing Stack**: `<Stack spacing={{ xs: 2, md: 4 }}>` wraps the `Header` and the `Routes`.
4. **Header**: `<Header />` is persistent at the top of the stack.
5. **Footer**: `<Footer />` follows the main container.

### Layout Technical Standards
- **Standard Spacing**: Use `spacing={{ xs: 2, md: 4 }}` for the vertical gap between components (e.g., Header and Paper).
- **Responsive Padding**: Set `disableGutters={isMobile}` on the main `Container` so that on mobile (xs), content fills the width, while on desktop (md/up), standard margins apply.
- **Component Independence**: Page components (`src/pages/*`) must **not** include their own `Container` or `Header`. They should focus only on their specific content.

## 5. Common UI Patterns

### Cards and Containers
- **Shadow**: `elevation={1}` is used as the default; it may be flat (`elevation={0}`) on mobile.
- **Border Radius**:
  - Standard cards (BookDetail, BookSearch, BookInfo): `2` (8px)
  - Page-level wrapper cards (AboutService, TermsOfService): `4` (16px)
  - Small elements (icons, tags): `1` (4px)
- **Spacing**: Follows MUI's `spacing` system, using multiples of 8px. (`p: 2` = 16px)

### Section Containers (Static Content Pages)
For static information pages (e.g., `AboutService`, `TermsOfService`), all sections are wrapped in a single white `Paper` with `borderRadius: 4` and `elevation={isMobile ? 0 : 2}`. Sections inside are separated by `Divider` or alternating background colors (`rgba(92, 45, 145, 0.02)`).

### Interaction
- **Buttons**: Set to `textTransform: 'none'` to prevent uppercase conversion and maintain original text.
- **Hover**: Provides feedback like colors deepening or a transparent background appearing on mouseover.
- **Card Hover (Info pages)**: `translateY(-8px)` + `boxShadow` elevation for philosophy/feature cards.

## 6. Icons
Uses the official Material UI icon set (`@mui/icons-material`).
- Account info: `AccountCircle`
- Time: `AccessTime`
- Reactions: `ThumbUp`, `Favorite`
- Search: `Search`
- Legal: `Gavel`

## 7. Styling Implementation Principles
To ensure consistent style application during development, adhere to the following principles:

- **Utilize MUI System**: Use MUI's `sx` prop as much as possible when defining styles.
- **Reference Theme Palette**: Use theme palette values instead of hardcoded color codes. (e.g., `color="primary.main"`, `bgcolor="background.paper"`)
- **Responsive Support**: Define viewport-specific styles using Breakpoint objects. (e.g., `sx={{ width: { xs: '100%', md: '50%' } }}`)
- **Section Header Mandatory**: Every user-visible section with a title **must** use the Overline + Title pattern defined in Section 3.
