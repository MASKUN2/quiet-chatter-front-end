# 2026-02-20 Transition to Semantic Release

## Task Overview
Transitioned from the existing `release-please` automation method to `semantic-release` to enable more sophisticated version management and utilization of the plugin ecosystem.

## Key Changes

### 1. Introduction of Semantic Release
- **Package Installation**: Installed `semantic-release` and related plugins (`changelog`, `git`, `github`, `npm`).
- **Configuration File Creation**: Defined the release process (commit analysis, CHANGELOG generation, Git commit, GitHub Release creation) via the `.releaserc.json` file.

### 2. CI/CD Workflow Replacement
- **Workflow Deletion**: Removed the existing `.github/workflows/release-please.yml`.
- **Workflow Creation**: Created a new `.github/workflows/release.yml` to perform automatic releases upon pushes to the `main` branch.

### 3. Documentation Update
- **Commit Convention Specification**: Added Conventional Commits rules to `docs/guide/code_style_guide.md`.
- **Infrastructure Guide Refresh**: Updated the release management section of `docs/guide/infrastructure_guide.md` to `semantic-release`.
- **History Recording**: Documented the background and decisions of the transition in `docs/project_history.md`.

## Verification
- Confirmed passage of `npm run build` and `npm run lint`.
- Verified syntax and path validity of the configuration file.
