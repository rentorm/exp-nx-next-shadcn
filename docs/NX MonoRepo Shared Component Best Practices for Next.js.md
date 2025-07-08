# NX MonoRepo Shared Component Best Practices for Next.js

## Overview

Managing shared components in an NX monorepo with Next.js applications requires careful planning to ensure maintainability, reusability, and performance. This guide covers essential practices for structuring, developing, and maintaining shared component packages.

## Repository Structure

### Recommended Folder Structure

```
my-workspace/
├── apps/
│   ├── app1/          # Next.js application
│   └── app2/          # Another Next.js application
├── libs/
│   ├── ui/            # Shared UI components
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   └── modal/
│   │   │   └── index.ts
│   │   ├── project.json
│   │   └── tsconfig.json
│   ├── utils/         # Shared utilities
│   ├── hooks/         # Shared React hooks
│   └── types/         # Shared TypeScript types
├── nx.json
├── package.json
└── tsconfig.base.json
```

### Library Types

Create different types of libraries for better organization:

- **UI Libraries**: Pure presentational components
- **Feature Libraries**: Business logic components
- **Data-Access Libraries**: API and state management
- **Util Libraries**: Helper functions and utilities

## Creating Shared Component Libraries

### Generate a New UI Library

```bash
# Create a shared UI library
nx g @nx/react:library ui --directory=libs/ui --importPath=@myorg/ui

# Create a component within the library
nx g @nx/react:component button --project=ui --directory=lib/button
```

### Library Configuration

Configure your `project.json` for the shared library:

```json
{
  "name": "ui",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/ui/src",
  "projectType": "library",
  "tags": ["scope:shared", "type:ui"],
  "targets": {
    "build": {
      "executor": "@nx/rollup:rollup",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/libs/ui",
        "tsConfig": "libs/ui/tsconfig.lib.json",
        "project": "libs/ui/package.json",
        "entryFile": "libs/ui/src/index.ts",
        "external": ["react", "react-dom"],
        "rollupConfig": "@nx/react/plugins/bundle-rollup"
      }
    }
  }
}
```

## Component Development Best Practices

### 1. Component Structure

Each component should follow a consistent structure:

```typescript
// libs/ui/src/lib/button/button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 2. Export Management

Create a clean public API in your index files:

```typescript
// libs/ui/src/index.ts
export * from './lib/button/button';
export * from './lib/card/card';
export * from './lib/modal/modal';

// Re-export types
export type { ButtonProps } from './lib/button/button';
export type { CardProps } from './lib/card/card';
```

### 3. TypeScript Configuration

Ensure proper TypeScript setup for your shared libraries:

```json
// libs/ui/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "allowJs": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "declaration": true,
    "declarationMap": true
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```

## Styling Strategies

### 1. CSS Modules

Use CSS Modules for component-scoped styling:

```css
/* libs/ui/src/lib/button/button.module.css */
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.primary {
  background-color: var(--primary-color, #0070f3);
  color: white;
}

.secondary {
  background-color: var(--secondary-color, #eaeaea);
  color: var(--text-color, #000);
}
```

### 2. CSS-in-JS with Styled Components

Alternative approach using styled-components:

```typescript
// Install: pnpm add styled-components
import styled from 'styled-components';

export const StyledButton = styled.button<{ $variant: string }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: ${props => 
    props.$variant === 'primary' ? '#0070f3' : '#eaeaea'
  };
`;
```

### 3. Tailwind CSS Integration

For Tailwind CSS usage across shared components:

```typescript
// libs/ui/tailwind.config.js
module.exports = {
  content: ['libs/ui/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

// Component using Tailwind
export const Button: FC<ButtonProps> = ({ variant, size, className, ...props }) => {
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };
  
  return (
    <button 
      className={`px-4 py-2 rounded ${variants[variant]} ${className}`} 
      {...props} 
    />
  );
};
```

## Testing Shared Components

### 1. Unit Testing Setup

```typescript
// libs/ui/src/lib/button/button.spec.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('should render successfully', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Storybook Integration

Set up Storybook for component documentation and testing:

```bash
# Install Storybook
nx g @nx/storybook:configuration ui
```

Create stories for your components:

```typescript
// libs/ui/src/lib/button/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};
```

## Dependency Management

### 1. Peer Dependencies

Define peer dependencies in your library's `package.json`:

```json
{
  "name": "@myorg/ui",
  "version": "0.0.1",
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-dom": ">=17.0.0"
  },
  "dependencies": {
    "clsx": "^2.0.0"
  }
}
```

### 2. Import Boundaries

Use NX tags to enforce module boundaries:

```json
// nx.json
{
  "@nx/enforce-module-boundaries": {
    "enforceBuildableLibDependency": true,
    "allow": [],
    "depConstraints": [
      {
        "sourceTag": "scope:app",
        "onlyDependOnLibsWithTags": ["scope:shared", "scope:feature"]
      },
      {
        "sourceTag": "scope:shared",
        "onlyDependOnLibsWithTags": ["scope:shared"]
      }
    ]
  }
}
```

## Performance Optimization

### 1. Tree Shaking

Ensure proper tree shaking by using named exports:

```typescript
// Good - allows tree shaking
export { Button } from './lib/button/button';
export { Card } from './lib/card/card';

// Avoid - prevents tree shaking
export * from './lib/components';
```

### 2. Code Splitting

For large component libraries, consider splitting into smaller packages:

```
libs/
├── ui-core/       # Essential components
├── ui-forms/      # Form components
├── ui-charts/     # Chart components
└── ui-layouts/    # Layout components
```

### 3. Lazy Loading

Implement lazy loading for heavy components:

```typescript
// In your Next.js app
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(
  () => import('@myorg/ui-charts').then(mod => mod.Chart),
  { 
    loading: () => <p>Loading chart...</p>,
    ssr: false 
  }
);
```

## Versioning and Publishing

### 1. Semantic Versioning

Follow semantic versioning for your libraries:

```bash
# Use NX to version your packages
nx affected --target=version --base=main --head=HEAD
```

### 2. Publishable Libraries

Make libraries publishable when needed:

```bash
# Generate a publishable library
nx g @nx/react:library ui-core \
  --publishable \
  --importPath=@myorg/ui-core \
  --buildable
```

### 3. Local Registry Testing

Test packages before publishing:

```bash
# Start local registry
nx local-registry

# Publish to local registry
nx run-many --target=publish --ver=1.0.0 --tag=latest
```

## Common Pitfalls and Solutions

### 1. Circular Dependencies

Avoid circular dependencies by:
- Using proper library boundaries
- Creating separate type libraries
- Following unidirectional data flow

### 2. Style Conflicts

Prevent style conflicts by:
- Using CSS Modules or CSS-in-JS
- Implementing proper CSS reset/normalization
- Using unique class name prefixes

### 3. Build Issues

Common build issues and solutions:
- **Module resolution**: Ensure `tsconfig.base.json` has proper path mappings
- **React version mismatch**: Use peer dependencies
- **SSR issues**: Test components in Next.js environment

## Best Practices Summary

1. **Keep components pure and reusable**: Avoid business logic in UI components
2. **Document with Storybook**: Maintain up-to-date component documentation
3. **Test thoroughly**: Write unit tests for all shared components
4. **Use TypeScript**: Leverage TypeScript for better type safety
5. **Follow naming conventions**: Use consistent naming across your monorepo
6. **Optimize bundle size**: Monitor and optimize component bundle sizes
7. **Version carefully**: Use semantic versioning and changelog
8. **Enforce boundaries**: Use NX tags to maintain clean architecture

## Conclusion

Following these best practices will help you build a maintainable, scalable shared component system in your NX monorepo. Regular refactoring, consistent patterns, and good documentation are key to long-term success.