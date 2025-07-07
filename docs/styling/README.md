# Styling Implementation Guide

This document outlines the styling architecture and implementation for the Context Surfer Nx experiment project.

## Overview

This project uses a shared Tailwind CSS theme system that provides consistent styling across all applications and libraries in the monorepo. The styling system is designed to be:

- **Consistent**: All apps use the same design tokens and theme
- **Maintainable**: Single source of truth for theme configuration
- **Extensible**: Apps can add their own theme extensions
- **Reusable**: Shared components include their own styling

## Architecture

### File Structure

```
├── tailwind.config.base.js          # Base theme configuration
├── apps/
│   └── web/
│       ├── tailwind.config.js       # App-specific Tailwind config
│       ├── postcss.config.js        # PostCSS configuration
│       └── src/app/global.css       # App-specific styles
├── shared/
│   ├── tailwind.config.js           # Shared library Tailwind config
│   ├── postcss.config.js            # PostCSS configuration
│   └── src/styles/globals.css       # Shared component styles
└── docs/styling/                    # Documentation
```

### Configuration Hierarchy

1. **Base Theme** (`tailwind.config.base.js`)
   - Contains all design tokens (colors, typography, spacing, animations)
   - Shared across all apps and libraries
   - Single source of truth for the design system

2. **App Configuration** (`apps/*/tailwind.config.js`)
   - Extends base theme
   - Includes content paths for the app and shared libraries
   - Can add app-specific theme extensions

3. **Shared Library Configuration** (`shared/tailwind.config.js`)
   - Uses base theme configuration
   - Includes content paths for shared components
   - Can add library-specific theme extensions

## Key Features

### Design System

- **Brand Colors**: Primary brand color palette with 50-950 shades
- **Semantic Colors**: Success, warning, error, and accent colors
- **Typography**: Custom font families (Inter, JetBrains Mono)
- **Spacing**: Extended spacing scale with custom values
- **Animations**: Custom animations and keyframes
- **Shadows**: Consistent shadow system

### Component Utilities

The shared library includes pre-built component classes:

- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Cards**: `.card` for consistent card styling
- **Forms**: `.input`, `.label` for form elements
- **Sizes**: `.btn-sm`, `.btn-md`, `.btn-lg` for button sizes

### Content Scanning

The configuration automatically scans for Tailwind classes in:
- App source files
- Shared library components
- Excludes test and story files

## Usage

### For Applications

1. **Import shared styles**:
```javascript
import '@my-org/shared';
```

2. **Use design tokens**:
```jsx
<div className="bg-primary-600 text-white p-4 rounded-lg">
  <h2 className="text-xl font-semibold">Primary Card</h2>
</div>
```

3. **Use component utilities**:
```jsx
<button className="btn btn-primary btn-md">
  Click me
</button>
```

### For Shared Components

1. **Use consistent styling**:
```jsx
export const Button = ({ children, variant = 'primary' }) => {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  );
};
```

2. **Add custom styles when needed**:
```css
/* In shared/src/styles/globals.css */
@layer components {
  .custom-component {
    @apply bg-white rounded-lg shadow-md p-4;
  }
}
```

## Development Workflow

### Adding New Design Tokens

1. Update `tailwind.config.base.js`
2. Changes automatically propagate to all apps and libraries
3. Use the new tokens in components

### Adding App-Specific Styles

1. Extend theme in app's `tailwind.config.js`:
```javascript
module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      // App-specific extensions
      colors: {
        'app-specific': '#custom-color',
      },
    },
  },
};
```

### Adding Shared Component Styles

1. Add styles to `shared/src/styles/globals.css`
2. Use `@layer components` for component utilities
3. Follow the established naming conventions

## Best Practices

1. **Use Design Tokens**: Always use theme colors, spacing, and typography
2. **Component Utilities**: Create reusable utility classes for common patterns
3. **Consistent Naming**: Follow the established naming conventions
4. **Layer Organization**: Use `@layer` directives for proper CSS organization
5. **Documentation**: Document any custom utilities or patterns

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Nx Tailwind Guide](https://nx.dev/guides/using-tailwind-css-in-react)
- [Component Styling Guide](./components.md)
- [Theme Configuration Guide](./theme.md)