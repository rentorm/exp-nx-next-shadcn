# Nx Experiment

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

An experimental Nx monorepo setup with Next.js, React, and ShadCN components for exploring modern web development patterns.

<!-- CI Performance Test: Evaluating optimized GitHub Actions workflow with Nx Cloud distribution and caching improvements -->

## Project Overview

This repository demonstrates a full-stack monorepo architecture using:
- **Next.js 15** with React 19 for the main web application
- **Shared component library** with ShadCN UI components and Storybook
- **Unified Design System** with CSS variables and consistent theming
- **Tailwind CSS** with ShadCN integration for utility-first styling
- **TypeScript** with strict type checking and proper path aliases
- **Comprehensive testing** with Jest, Playwright, and Vitest

## Architecture Highlights

### 🎨 Design System Integration
- **ShadCN UI Components**: Official components installed via CLI in shared library
- **CSS Variables Theme**: Consistent theming with light/dark mode support
- **Unified Styling**: Single source of truth for colors, spacing, and typography
- **Component Reusability**: All apps share the same design system

### 📦 Monorepo Structure
```
├── apps/
│   ├── web/                    # Next.js web application
│   └── web-e2e/               # End-to-end tests
├── shared/                     # Shared component library
│   ├── src/
│   │   ├── components/ui/      # ShadCN components
│   │   ├── lib/               # Utilities and helpers
│   │   └── styles/            # Global CSS with theme variables
│   └── components.json        # ShadCN configuration
├── tailwind.config.base.js     # Base Tailwind configuration
└── CLAUDE.md                  # Development guidelines
```

### 🛠️ Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS + ShadCN UI components
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Nx with advanced caching and task orchestration
- **Testing**: Jest (unit), Playwright (e2e), Vitest (library)
- **Development**: Storybook for component development and documentation

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/kbXRscncNx)


## Quick Start

### Development
```bash
# Start the web application
npx nx dev web

# Run Storybook for component development
npx nx storybook shared

# View the dependency graph
npx nx graph
```

### Building
```bash
# Build for production
npx nx build web

# Build the shared library
npx nx build shared

# Run all tests
npx nx test
```

### Adding ShadCN Components
```bash
# Navigate to shared library
cd shared

# Add new ShadCN components
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu

# Components are automatically available in all apps via @my-org/shared
```

### Code Quality
```bash
# Run linting
npx nx lint

# Run type checking
npx nx typecheck

# Run end-to-end tests
npx nx e2e web-e2e
```

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Design System Usage

### Importing Components
```typescript
// In any app, import from shared library
import { Button, Card, CardHeader, CardTitle } from '@my-org/shared';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <Button variant="outline">Click me</Button>
    </Card>
  );
}
```

### Theme Customization
The design system uses CSS variables defined in `shared/src/styles/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more variables */
}
```

### Dark Mode Support
Dark mode is automatically supported via CSS variables. Toggle with:
```typescript
document.documentElement.classList.toggle('dark');
```

## Expanding the Monorepo

### Adding New Applications
```bash
# Generate a new Next.js app with our design system
npx nx g @nx/next:app mobile --style=none

# The new app will automatically inherit:
# - Tailwind configuration from tailwind.config.base.js
# - Access to shared components via @my-org/shared
# - Consistent theming and styling
```

### Adding New Libraries
```bash
# Generate a new React library
npx nx g @nx/react:lib feature-auth --style=none

# Libraries can use shared components:
import { Button, Input } from '@my-org/shared';
```

### Project Structure Best Practices
- **Apps**: User-facing applications (web, mobile, admin, etc.)
- **Shared**: Core UI components and design system
- **Libs**: Feature libraries, utilities, and business logic
- **Tools**: Build tools, scripts, and configuration

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
