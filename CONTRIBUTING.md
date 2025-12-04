# Contributing to SageBox

Thank you for your interest in contributing to SageBox! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/sagebox.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feat/your-feature`

## Development

```bash
# Start development server
npm start

# Run tests
npm test

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check bundle size
npm run size

# Run Storybook
npm run storybook

# Build the project
npm run build

# Build all (core + angular + react)
npm run build:all
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for automatic versioning and changelog generation.

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type       | Description                                         |
|------------|-----------------------------------------------------|
| `feat`     | A new feature                                       |
| `fix`      | A bug fix                                           |
| `docs`     | Documentation only changes                          |
| `style`    | Changes that don't affect code meaning              |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf`     | Code change that improves performance               |
| `test`     | Adding missing tests or correcting existing tests   |
| `build`    | Changes that affect the build system                |
| `ci`       | Changes to CI configuration files and scripts       |
| `chore`    | Other changes that don't modify src or test files   |
| `revert`   | Reverts a previous commit                           |

### Examples

```bash
# Feature
git commit -m "feat(skeleton): add pulse animation variant"

# Bug fix
git commit -m "fix(svg-icon): fix icon sizing on retina displays"

# Breaking change
git commit -m "feat(button)!: change default size to medium

BREAKING CHANGE: Default button size changed from small to medium"
```

## Creating a Component

```bash
npm run generate
```

Follow the prompts to create a new component with all necessary files.

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Ensure all tests pass: `npm test`
3. Ensure the build succeeds: `npm run build`
4. Create a Pull Request with a clear description

## Code Style

- Use TypeScript for all components
- Follow the existing code style
- Write meaningful test cases
- Document public APIs

## Questions?

Feel free to open an issue for any questions or concerns!
