# Design Guide

This document defines the visual language and design principles for the `quiet-chatter-front-end` project. We adhere to the following guide to maintain a consistent user experience (UX) and brand identity.

## 1. Design Philosophy
- **Anonymity and Ephemerality**: Maintain a calm and static tone so users can participate without burden.
- **Readability Focused**: As a text-centric (BookTalk) service, use highly readable fonts and ample whitespace.
- **Responsive Optimization**: Given the nature of the service with many mobile users, all components are considered for the mobile environment first.

## 2. Color Palette

### Primary Colors
Core colors representing the project's identity.
- **Deep Violet**: `#5c2d91` (Primary buttons, text highlights)
- **Deep Indigo**: `#4b0082` (Hover states, emphasis)
- **Light Violet**: `rgba(92, 45, 145, 0.04)` (Button background effects)

### Background & Text
- **Default Background**: `#f8f9fa` (Overall app background)
- **Paper Background**: `#ffffff` (Cards, modals, section backgrounds)
- **Text Primary**: `rgba(0, 0, 0, 0.87)` (Primary body text)
- **Text Secondary**: `rgba(0, 0, 0, 0.6)` (Descriptions, author info, dates)
- **Border**: `#eee` or `grey.200` (Dividers, light borders)

## 3. Typography
The default font is **Pretendard**, loaded via CDN.

- **Heading (h4)**: 1.75rem (28px), Bold - Page titles
- **Sub-heading (h5/h6)**: 1.25rem ~ 1.125rem, Semi-bold - Section titles, book titles
- **Body 1**: 1rem (16px), Regular - Primary body text, Talk content
- **Body 2**: 0.875rem (14px) - Secondary info, list items
- **Caption**: 0.75rem (12px) - Dates, small metadata

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
  - Standard cards (BookDetail, BookSearch): `2` (8px)
  - Section containers and page cards: `4` (16px) — e.g., `AboutService`
  - Small elements (icons, tags): `1` (4px)
- **Spacing**: Follows MUI's `spacing` system, using multiples of 8px. (`p: 2` = 16px)

### Interaction
- **Buttons**: Set to `textTransform: 'none'` to prevent uppercase conversion and maintain original text.
- **Hover**: Provides feedback like colors deepening or a transparent background appearing on mouseover.

## 6. Icons
Uses the official Material UI icon set (`@mui/icons-material`).
- Account info: `AccountCircle`
- Time: `AccessTime`
- Reactions: `ThumbUp`, `Favorite`
- Search: `Search`

## 7. Styling Implementation Principles
To ensure consistent style application during development, adhere to the following principles:

- **Utilize MUI System**: Use MUI's `sx` prop as much as possible when defining styles.
- **Reference Theme Palette**: Use theme palette values instead of hardcoded color codes. (e.g., `color="primary.main"`, `bgcolor="background.paper"`)
- **Responsive Support**: Define viewport-specific styles using Breakpoint objects. (e.g., `sx={{ width: { xs: '100%', md: '50%' } }}`)
