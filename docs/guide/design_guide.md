# Design Guide

This document explains the colors, text styles, and structure used in the `quiet-chatter-front-end` project. We follow this guide to keep the app looking great and consistent for everyone!

## 1. Design Philosophy

- **Anonymity and Relaxing Tone**: Keep colors and styles calm so users feel comfortable participating.
- **Easy to Read**: Since this is a BookTalk service, readable text and good spacing (whitespace) are top priorities.
- **Mobile First**: Many users are on phones. All pieces of the UI must look perfect on mobile first!

## 2. Color Palette

Here are the colors that define our project's look and feel:

| Color Name | Hex / RGBA Code | Usage Example |
| :--- | :--- | :--- |
| **Deep Violet** | `#5c2d91` | Primary buttons, text highlights, overline labels |
| **Deep Indigo** | `#4b0082` | Hover states, emphasis |
| **Light Violet** | `rgba(92, 45, 145, 0.04)` | Button backgrounds and subtle effects |
| **Highlight Tint** | `rgba(92, 45, 145, 0.07~0.12)`| Inline text highlight backgrounds |
| **Default Background** | `#f8f9fa` | Overall app background |
| **Paper Background** | `#ffffff` | Cards, modals, and section backgrounds |
| **Text Primary** | `rgba(0, 0, 0, 0.87)` | Main body text |
| **Text Secondary** | `rgba(0, 0, 0, 0.6)` | Descriptions, author info, or dates |
| **Border Color** | `#eee` or `grey.200` | Dividers and light card borders |

## 3. Typography (Text Styles)

The default font is **Pretendard**, loaded via a CDN. 

### Scale Guide
- **Heading (h2)**: Very large, used only for brand pages (like About). Use an exciting gradient text and `fontWeight: 900`.
- **Heading (h4/h5)**: Standard page and section titles. Very bold (`fontWeight: 700/600`).
- **Sub-heading (h6)**: Smaller section titles inside cards. 
- **Body 1 (16px)**: Normal paragraph text or Talk content. Needs a nice line height for reading (`1.6`).
- **Body 2 (14px)**: Secondary info or list items.
- **Caption (12px)**: Tiny dates and metadata.

### The Section Header Pattern (Very Important!)
Whenever you create a new section of the app that needs a title, you **must** use this two-line pattern (an Overline and a main Title):

```tsx
// 1. A tiny upper-case label
<Typography variant="overline" sx={{
  color: 'primary.main',
  fontWeight: 800,
  letterSpacing: '0.2em',
  fontSize: '0.75rem',
  display: 'block',
  lineHeight: 1.4
}}>
  SECTION LABEL   {/* Always uppercase English like "FOR YOU" or "BOOK TALK" */}
</Typography>

// 2. The main title text
<Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mt: 0.5 }}>
  섹션 제목 {/* E.g., "관심 있는 북톡" */}
</Typography>
```

> **Note on Gradients**: You can use a cool purple gradient text on special marketing pages (`AboutService`), but NEVER on data pages (lists or search results).

## 4. App Layout Structure

To make sure every page looks the same, the main wrapper is kept inside `src/App.tsx`. New pages export their content, and `App.tsx` handles wrapping them!

### How it looks in `App.tsx`
1. **Flex Wrapper**: A `Box` that covers the whole screen height (`minHeight: 100vh`).
2. **Main Container**: `<Container maxWidth="md" disableGutters={isMobile}>`. This ensures the content has the correct maximum width.
3. **Spacing Stack**: A layout stack containing the Header, Main Content Area, and Footer. 

### Layout Rules for New Pages
- **Spacing**: Use `spacing={{ xs: 2, md: 4 }}` to space out different blocks inside your page.
- **Responsive Padding**: The sides of the app touch the edges of the screen on mobile (`xs`), but have nice padding on desktop (`md` and up).
- **Keep Pages Simple**: Your new page components (in `src/pages/*`) should **never** include a `<Container>` or `<Header>`. `App.tsx` already does that for you! Just return your content `<Stack>`.

## 5. UI Elements

- **Buttons**: Don't let buttons capitalize automatically! Keep `textTransform: 'none'`.
- **Cards**: Use a tiny shadow (`elevation={1}`) by default. For mobile, it sometimes looks better flat (`elevation={0}`). The standard corner roundness (border-radius) is `2` (8px).
- **Hover Effects**: When users hover over links or buttons, there should be a subtle effect (like a faint background appearing).
- **Icons**: Always stick to the official Material UI icon set (`@mui/icons-material`), such as `<SearchIcon />`.

## 6. Styling Code Rules

When actually coding styles:
- **Use MUI System**: Try to use the `sx` prop for everything layout-related.
- **Reference Theme Palette**: Use the theme colors (`color="primary.main"`) instead of writing raw hex codes (`#5c2d91`).
- **Responsive Easy Way**: Need different sizes based on phone vs computer? Use Breakpoint objects: `sx={{ width: { xs: '100%', md: '50%' } }}`.
