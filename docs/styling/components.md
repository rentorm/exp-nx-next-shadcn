# Component Styling Guide

This guide covers component styling patterns and utilities in the Context Surfer Nx project.

## Component Utilities

The shared library provides pre-built component utilities that ensure consistent styling across all applications. These utilities are defined in `shared/src/styles/globals.css`.

### Button Components

#### Base Button Class
```css
.btn {
  @apply inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background;
}
```

#### Button Variants
```css
.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500;
}

.btn-secondary {
  @apply bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus-visible:ring-secondary-500;
}

.btn-outline {
  @apply border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500;
}
```

#### Button Sizes
```css
.btn-sm {
  @apply px-3 py-1.5 text-xs;
}

.btn-md {
  @apply px-4 py-2 text-sm;
}

.btn-lg {
  @apply px-6 py-3 text-base;
}
```

#### Usage Examples
```jsx
// Primary button
<button className="btn btn-primary btn-md">
  Save Changes
</button>

// Secondary button
<button className="btn btn-secondary btn-sm">
  Cancel
</button>

// Outline button
<button className="btn btn-outline btn-lg">
  Learn More
</button>
```

### Card Components

#### Base Card Class
```css
.card {
  @apply bg-white rounded-lg shadow-md border border-gray-200 p-6;
}
```

#### Usage Examples
```jsx
// Basic card
<div className="card">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600">Card content goes here.</p>
</div>

// Card with custom styling
<div className="card bg-primary-50 border-primary-200">
  <h3 className="text-primary-900 font-semibold mb-2">Primary Card</h3>
  <p className="text-primary-700">Specialized card content.</p>
</div>
```

### Form Components

#### Input Components
```css
.input {
  @apply flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
}

.label {
  @apply text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70;
}
```

#### Usage Examples
```jsx
// Form field
<div className="space-y-2">
  <label className="label" htmlFor="email">
    Email Address
  </label>
  <input
    className="input"
    id="email"
    type="email"
    placeholder="Enter your email"
  />
</div>

// Form with validation states
<div className="space-y-2">
  <label className="label text-error-700" htmlFor="password">
    Password
  </label>
  <input
    className="input border-error-300 focus-visible:ring-error-500"
    id="password"
    type="password"
    placeholder="Enter your password"
  />
  <p className="text-sm text-error-600">Password is required</p>
</div>
```

## Component Patterns

### Layout Components

#### Container Pattern
```jsx
const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};
```

#### Section Pattern
```jsx
const Section = ({ children, className = '' }) => {
  return (
    <section className={`py-12 sm:py-16 lg:py-20 ${className}`}>
      {children}
    </section>
  );
};
```

### State-Based Styling

#### Loading States
```jsx
const Button = ({ isLoading, children, ...props }) => {
  return (
    <button
      className={`btn btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
      )}
      {children}
    </button>
  );
};
```

#### Error States
```jsx
const FormField = ({ error, ...props }) => {
  return (
    <div className="space-y-2">
      <input
        className={`input ${error ? 'border-error-300 focus-visible:ring-error-500' : ''}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600 flex items-center">
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};
```

### Responsive Components

#### Responsive Grid
```jsx
const ResponsiveGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
};
```

#### Responsive Text
```jsx
const ResponsiveHeading = ({ children }) => {
  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
      {children}
    </h1>
  );
};
```

## Advanced Patterns

### Compound Components

#### Modal Component
```jsx
const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-bounce-in">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.Header = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">
    {children}
  </div>
);

Modal.Body = ({ children }) => (
  <div className="px-6 py-4">
    {children}
  </div>
);

Modal.Footer = ({ children }) => (
  <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
    {children}
  </div>
);
```

### Custom Hooks for Styling

#### useTheme Hook
```jsx
const useTheme = () => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return { theme, toggleTheme };
};
```

#### useBreakpoint Hook
```jsx
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('sm');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.innerWidth >= 1024) setBreakpoint('lg');
      else if (window.innerWidth >= 768) setBreakpoint('md');
      else setBreakpoint('sm');
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return breakpoint;
};
```

## Best Practices

### 1. Component Composition
- Use utility classes for one-off styling
- Create component utilities for repeated patterns
- Compose larger components from smaller utilities

### 2. Naming Conventions
- Use semantic names (`btn-primary`, not `btn-blue`)
- Follow BEM-like patterns for complex components
- Keep utility class names descriptive

### 3. State Management
- Use conditional classes for state-based styling
- Implement proper focus and accessibility states
- Handle loading and error states consistently

### 4. Responsive Design
- Use mobile-first approach
- Implement consistent breakpoint usage
- Test across different screen sizes

### 5. Performance
- Avoid inline styles when possible
- Use CSS variables for dynamic values
- Optimize class concatenation

## Creating New Component Utilities

### Step 1: Define the Utility
Add new utilities to `shared/src/styles/globals.css`:

```css
@layer components {
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }
  
  .badge-primary {
    @apply bg-primary-100 text-primary-800;
  }
  
  .badge-success {
    @apply bg-success-100 text-success-800;
  }
  
  .badge-warning {
    @apply bg-warning-100 text-warning-800;
  }
  
  .badge-error {
    @apply bg-error-100 text-error-800;
  }
}
```

### Step 2: Document Usage
Add examples to this guide:

```jsx
// Usage examples
<span className="badge badge-primary">New</span>
<span className="badge badge-success">Active</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-error">Error</span>
```

### Step 3: Test Across Applications
Ensure the new utilities work in all apps that use the shared library.

## Troubleshooting

### Common Issues

1. **Styles not applying**: Check if component utilities are imported
2. **Inconsistent appearance**: Verify all apps import shared styles
3. **Specificity conflicts**: Use `@layer` directives properly
4. **Missing hover states**: Ensure interactive elements have proper states

### Debug Tips

1. Use browser dev tools to inspect applied classes
2. Check the generated CSS for conflicts
3. Verify component utilities are in the correct `@layer`
4. Test with minimal examples to isolate issues

## References

- [Tailwind CSS Component Layer](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer)
- [Tailwind CSS Utility-First](https://tailwindcss.com/docs/utility-first)
- [React Component Patterns](https://reactpatterns.com/)