# Theme Configuration Guide

This guide explains how to configure and extend the Tailwind CSS theme system in the Context Surfer Nx project.

## Base Theme Configuration

The base theme is defined in `tailwind.config.base.js` and serves as the foundation for all styling in the monorepo.

### Color System

#### Brand Colors
The primary brand color with full shade range:
```javascript
brand: {
  50: '#eff6ff',   // Lightest
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',  // Base brand color
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',  // Darkest
}
```

#### Semantic Colors
- **Primary**: Main interaction color (blue)
- **Secondary**: Supporting elements (gray)
- **Accent**: Highlights and emphasis (orange)
- **Success**: Positive actions (green)
- **Warning**: Caution states (yellow)
- **Error**: Error states (red)

#### Usage Examples
```jsx
// Using brand colors
<div className="bg-brand-500 text-white">Brand Element</div>

// Using semantic colors
<button className="bg-primary-600 hover:bg-primary-700">Primary Button</button>
<div className="text-success-600">Success message</div>
<div className="border-error-300 text-error-700">Error state</div>
```

### Typography

#### Font Families
```javascript
fontFamily: {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', ...],
  serif: ['Georgia', 'Cambria', 'Times New Roman', ...],
  mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', ...],
}
```

#### Font Sizes
Extended font size scale with line heights:
```javascript
fontSize: {
  'xs': ['0.75rem', { lineHeight: '1rem' }],
  'sm': ['0.875rem', { lineHeight: '1.25rem' }],
  'base': ['1rem', { lineHeight: '1.5rem' }],
  // ... up to 9xl
}
```

#### Usage Examples
```jsx
<h1 className="text-4xl font-bold text-gray-900">Heading</h1>
<p className="text-base text-gray-600">Body text</p>
<code className="font-mono text-sm">Code snippet</code>
```

### Spacing

#### Extended Spacing Scale
```javascript
spacing: {
  '18': '4.5rem',   // 72px
  '88': '22rem',    // 352px
  '128': '32rem',   // 512px
}
```

#### Usage Examples
```jsx
<div className="p-18 m-88">Large spacing</div>
<div className="max-w-128">Wide container</div>
```

### Animations

#### Custom Animations
```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'fade-out': 'fadeOut 0.5s ease-in-out',
  'slide-in': 'slideIn 0.3s ease-out',
  'slide-out': 'slideOut 0.3s ease-out',
  'bounce-in': 'bounceIn 0.6s ease-out',
  'spin-slow': 'spin 3s linear infinite',
}
```

#### Usage Examples
```jsx
<div className="animate-fade-in">Fading in</div>
<div className="animate-bounce-in">Bouncing in</div>
<div className="animate-spin-slow">Slow spinning</div>
```

## Extending the Theme

### App-Specific Extensions

To add app-specific theme extensions, modify the app's `tailwind.config.js`:

```javascript
// apps/web/tailwind.config.js
const baseConfig = require('../../tailwind.config.base');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      // App-specific extensions
      colors: {
        'app-primary': '#custom-color',
        'feature-blue': {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        'app-heading': ['Custom Font', 'serif'],
      },
      spacing: {
        'app-section': '6rem',
      },
    },
  },
};
```

### Shared Library Extensions

For shared library extensions, modify `shared/tailwind.config.js`:

```javascript
// shared/tailwind.config.js
const baseConfig = require('../tailwind.config.base');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      // Shared library extensions
      colors: {
        'component-bg': '#f8f9fa',
      },
      borderRadius: {
        'component': '0.625rem',
      },
    },
  },
};
```

## Configuration Best Practices

### 1. Theme Hierarchy
- Keep core design tokens in `tailwind.config.base.js`
- Add app-specific tokens in app configurations
- Add component-specific tokens in shared library configuration

### 2. Naming Conventions
- Use semantic names for colors (`primary`, `success`, `error`)
- Use descriptive names for custom values (`app-section`, `component-bg`)
- Follow the established shade system (50-950) for color palettes

### 3. Color Accessibility
- Ensure sufficient contrast ratios
- Test color combinations with accessibility tools
- Provide alternative indicators beyond color alone

### 4. Consistency
- Use existing design tokens before creating new ones
- Maintain consistent spacing and typography scales
- Follow the established animation patterns

## Migration Guide

### From Custom CSS to Theme Tokens

**Before:**
```css
.custom-component {
  background-color: #3b82f6;
  padding: 1.5rem;
  border-radius: 0.5rem;
}
```

**After:**
```jsx
<div className="bg-primary-500 p-6 rounded-lg">
  Custom component
</div>
```

### Adding New Design Tokens

1. **Identify the need**: Determine if existing tokens can be used
2. **Add to base config**: Update `tailwind.config.base.js`
3. **Document usage**: Add examples to this guide
4. **Test across apps**: Ensure tokens work in all applications

## Troubleshooting

### Common Issues

1. **Classes not applying**: Check content paths in config
2. **Inconsistent colors**: Verify base config is imported correctly
3. **Missing animations**: Ensure keyframes are defined in base config
4. **Build errors**: Check for circular dependencies in config files

### Debug Tips

1. Use browser dev tools to inspect applied styles
2. Check Tailwind's generated CSS output
3. Verify content scanning paths include all relevant files
4. Test with minimal examples to isolate issues

## References

- [Tailwind CSS Theme Configuration](https://tailwindcss.com/docs/theme)
- [Tailwind CSS Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [Nx Tailwind CSS Guide](https://nx.dev/guides/using-tailwind-css-in-react)