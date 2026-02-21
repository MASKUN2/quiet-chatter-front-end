# AI Agent Development Guide

This document contains the **agent-specific work instructions** that AI agents must follow when performing tasks in the `quiet-chatter-front-end` project. For general code styles or design principles, please refer to the separate guide documents.

## 1. Planning Principles

Before starting a task, the AI agent must establish an execution plan based on the following principles and obtain approval from the developer.

- **Industry Standard Design**: Prioritize and propose popular technologies or designs that are widely used in the industry and have rich references.
- **Provide a Single Path**: Exclude ambiguous options like "A or B" and explicitly determine and state the **single specific implementation path** that is most suitable for the current structure.
- **Deterministic Guidance**: Finalize technical decisions (e.g., whether to use a specific library, component location, etc.) during the planning stage so that developers can review them immediately.
- **Compliance with Industry Standards**: Follow the conventions of modern React and TypeScript, but apply the principles in the [**Code Style Guide**](code_style_guide.md) and [**Design Guide**](design_guide.md) as the top priority for detailed styles.

## 2. API Integration and Type Synchronization (Essential)

When modifying or adding features that integrate with the backend API, maintaining **OpenAPI spec-based type safety** is the most important factor.

### Essential Checklist
- **OpenAPI Spec URL**: [https://quiet-chatter.com/api/v1/spec](https://quiet-chatter.com/api/v1/spec)
- **Type Generation Command**: `npm run gen:types`

### Workflow
1. **Check Spec**: Run `npm run gen:types` to reflect backend API changes locally.
2. **Impact Analysis**: Check for compilation errors caused by changes in `src/types/api-schema.d.ts`.
3. **Implementation**: Modify `src/api/api.ts` and related components based on the updated types. **Never directly modify the auto-generated type files.**

## 3. Compliance with Related Guides (Delegation)

Agents must be familiar with the detailed rules defined in the following documents and reflect them in their work:

- [**Code Style Guide**](code_style_guide.md): Component structure, naming conventions, state management, and error handling principles.
- [**Infrastructure Guide**](infrastructure_guide.md): Domain information (Prod/Dev), API staging, and versioning policies.
- [**Design Guide**](design_guide.md): MUI usage, color palette, and responsive design layout rules.
- [**Authentication Guide**](authentication_guide.md): Member roles (Anonymous/Member) and permission policies.
- [**Project Structure**](project_structure.md): Directory roles and criteria for file placement.
- **Global Layout Adherence**: Always respect the centralized layout in `src/App.tsx`. New pages must not include their own `Header` or `Container` wrappers; they should export only the specific page content.

## 4. Final Verification

After completing all tasks, the agent must verify the results themselves through the following steps:

1. **Build Test**: Run `npm run build` to ensure there are no type errors or warnings.
2. **Lint Check**: Run `npm run lint` to ensure no convention violations.
3. **Runtime Check**: Run `npm run dev` and check for browser console warnings or API communication errors.
4. **Mock Testing**: Use `npm run dev:mock` to verify UI components against specific mocked API scenarios defined in `src/mocks/handlers.ts` without needing a real backend.
