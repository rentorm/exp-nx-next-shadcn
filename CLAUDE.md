# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is an Nx monorepo with Next.js applications and a unified ShadCN design system:

- `apps/web/` - Main Next.js application using shared design system
- `apps/web-e2e/` - End-to-end tests using Playwright
- `shared/` - Shared React components library with ShadCN UI components and Storybook
- `tailwind.config.base.js` - Base Tailwind configuration with ShadCN integration
- Root workspace manages all projects with unified tooling and theming

## Core Technologies

- **Nx**: Monorepo management and task orchestration
- **Next.js 15**: React framework for the web application
- **React 19**: Latest React version
- **TypeScript**: Strict type checking enabled with proper path aliases
- **ShadCN UI**: Modern component library with CSS variables theming
- **Tailwind CSS**: Utility-first CSS framework integrated with ShadCN
- **Lucide React**: Icon library for consistent iconography
- **Storybook**: Component development and documentation
- **Testing**: Jest for unit tests, Playwright for e2e, Vitest for shared library

## Design System Architecture

### ShadCN Integration
- **Components Location**: `shared/src/components/ui/` contains official ShadCN components
- **Installation Method**: Use `npx shadcn@latest add [component]` from `shared/` directory
- **Configuration**: `shared/components.json` contains ShadCN CLI configuration
- **Import Path**: All components available via `@my-org/shared` import

### Theming System
- **CSS Variables**: Defined in `shared/src/styles/globals.css` using HSL values
- **Dark Mode**: Automatic support via `.dark` class on document element
- **Customization**: Modify CSS variables in globals.css, not Tailwind config
- **Consistency**: All apps inherit the same theme through shared imports

### Component Usage
```typescript
// Correct way to import and use components
import { Button, Card, CardHeader, CardTitle } from '@my-org/shared';

// Use ShadCN components with proper variants
<Button variant="outline" size="lg">Click me</Button>
<Card className="w-full">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>
```

## Development Commands

### Running Applications
```bash
# Start web development server
npx nx dev web

# Build web application for production
npx nx build web

# Start production server
npx nx start web

# Run Storybook for shared components
npx nx storybook shared
```

### Adding ShadCN Components
```bash
# Navigate to shared library
cd shared

# Add new ShadCN components (automatically available in all apps)
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add form

# Export new components in shared/src/index.ts
export * from './components/ui/input';
export * from './components/ui/dialog';
```

### Testing
```bash
# Run all tests
npx nx test

# Run tests for specific project
npx nx test web
npx nx test shared

# Run e2e tests
npx nx e2e web-e2e

# Run Storybook tests
npx nx test-storybook shared
```

### Code Quality
```bash
# Lint all projects
npx nx lint

# Lint specific project
npx nx lint web

# Type check all projects
npx nx typecheck

# Type check specific project
npx nx typecheck web
```

### Project Management
```bash
# Show available targets for a project
npx nx show project web

# View dependency graph
npx nx graph

# Generate new Next.js app (inherits design system)
npx nx g @nx/next:app my-app --style=none

# Generate new React library
npx nx g @nx/react:lib my-lib --style=none
```

## Development Guidelines

### Component Creation
1. **Always use ShadCN components** from `@my-org/shared` instead of custom CSS
2. **Add new ShadCN components** via CLI in `shared/` directory
3. **Export all components** in `shared/src/index.ts` for easy importing
4. **Use Lucide React icons** for consistency across the design system

### Styling Rules
1. **Never use custom CSS classes** - use ShadCN components and Tailwind utilities
2. **Customize themes** via CSS variables in `shared/src/styles/globals.css`
3. **Use component variants** instead of custom styling (e.g., `Button variant="outline"`)
4. **Import styles** via the shared library, not individual CSS files

### Architecture Notes

- **ShadCN Components**: Official components installed via CLI and maintained in shared library
- **Unified Theming**: CSS variables provide consistent theming across all applications
- **TypeScript Path Aliases**: Configured for clean imports (`@/` for shared library internals)
- **Workspace Dependencies**: All apps automatically access shared components
- **Design System**: Single source of truth for UI components, icons, and theming

## Key Configuration Files

- `shared/components.json` - ShadCN CLI configuration for component installation
- `shared/src/styles/globals.css` - CSS variables theme system with dark mode support
- `tailwind.config.base.js` - Base Tailwind configuration with ShadCN integration
- `nx.json` - Nx workspace configuration with plugins and target defaults
- `tsconfig.base.json` - Base TypeScript configuration for all projects
- `vitest.workspace.ts` - Vitest workspace configuration
- `jest.config.ts` - Jest configuration for workspace-wide testing

## Security and Compliance

- **Signing Policy**: 
  - Please do not sign any content you are adding with git. That includes commit messages, issues, text or PR descriptions.