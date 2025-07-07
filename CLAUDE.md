# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is an Nx monorepo with Next.js applications and shared libraries:

- `apps/web/` - Main Next.js application with Tailwind CSS
- `apps/web-e2e/` - End-to-end tests using Playwright
- `shared/` - Shared React components and utilities library with Storybook
- Root workspace manages all projects with unified tooling

## Core Technologies

- **Nx**: Monorepo management and task orchestration
- **Next.js 15**: React framework for the web application
- **React 19**: Latest React version
- **TypeScript**: Strict type checking enabled
- **Tailwind CSS**: Utility-first CSS framework
- **Storybook**: Component development and documentation
- **Testing**: Jest for unit tests, Playwright for e2e, Vitest for shared library

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

# Generate new Next.js app
npx nx g @nx/next:app my-app

# Generate new React library
npx nx g @nx/react:lib my-lib
```

## Architecture Notes

- **Nx Plugins**: Configured for Next.js, React, Jest, Playwright, ESLint, Storybook, and Vite
- **Shared Library**: Contains reusable React components with Storybook stories
- **TypeScript Configuration**: Strict compilation with composite projects for better performance
- **Workspace Dependencies**: Tests depend on build targets (`targetDefaults`)
- **Generators**: Preconfigured to use Tailwind CSS and ESLint for new Next.js apps, Vitest for React libraries

## Key Configuration Files

- `nx.json` - Nx workspace configuration with plugins and target defaults
- `tsconfig.base.json` - Base TypeScript configuration for all projects
- `vitest.workspace.ts` - Vitest workspace configuration
- `jest.config.ts` - Jest configuration for workspace-wide testing