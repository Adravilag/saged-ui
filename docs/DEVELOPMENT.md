# Development Guide

## Prerequisites

- Node.js 20+
- npm 9+
- Git

## Setup

```bash
# Clone repository
git clone https://github.com/Adravilag/sagebox.git
cd sagebox

# Install dependencies
npm install

# Verify setup
npm run build:fast
npm run test:spec
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/my-feature
```

### 2. Make Changes

```bash
# Start dev server (watch mode)
npm run dev

# Or work on specific component
cd packages/button
npm run storybook
```

### 3. Test

```bash
# Unit tests
npm run test:spec

# Specific package
npm run test -- --filter=button

# With coverage
npm run test:coverage
```

### 4. Document Changes

```bash
npm run changeset
# Follow prompts to describe your changes
```

### 5. Commit

```bash
git add .
git commit -m "feat(button): add loading state"
```

Commit format: `type(scope): description`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### 6. Push & PR

```bash
git push origin feature/my-feature
# Create PR on GitHub
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with watch |
| `npm run build` | Production build |
| `npm run build:fast` | Fast build (dev only) |
| `npm run test:spec` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:coverage` | Tests with coverage |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix lint issues |
| `npm run storybook` | Start root Storybook |
| `npm run changeset` | Create changeset |
| `npm run generate` | Generate new component |

## Component Development

### Fast Iteration

```bash
cd packages/modal
npm run storybook  # ~500ms startup
```

### Build Verification

```bash
npm run build:fast  # ~1.5s
```

### Full Validation

```bash
npm run build       # Full production build
npm run test:spec   # All tests
npm run lint        # Linting
```

## Debugging

### Stencil Dev Tools

Enable source maps in dev mode (automatic with `build:fast`).

### Browser DevTools

1. Open component in Storybook
2. Right-click → Inspect
3. Find shadow DOM under `#shadow-root`

### Test Debugging

```bash
# Run specific test with verbose output
npm run test -- --filter=modal --verbose

# Run in headed mode (see browser)
npm run test:e2e -- --headed
```

## Pre-commit Hooks

Husky runs `lint-staged` on commit:

- ESLint on `.ts`, `.tsx`, `.js`
- Prettier on all staged files
- Commitlint on commit message

To bypass (not recommended):

```bash
git commit --no-verify -m "wip: temporary"
```
