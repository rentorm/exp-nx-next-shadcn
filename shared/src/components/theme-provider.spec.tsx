import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeProvider, useTheme } from './theme-provider';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock MediaQueryList
const mockMediaQueryList = {
  matches: false,
  media: '(prefers-color-scheme: dark)',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
};

// Test component that uses the theme context
function TestComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="set-light" onClick={() => setTheme('light')}>
        Set Light
      </button>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>
        Set Dark
      </button>
      <button data-testid="set-system" onClick={() => setTheme('system')}>
        Set System
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query) => ({
        ...mockMediaQueryList,
        media: query,
      })),
      writable: true,
    });
    
    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
        },
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render children and provide theme context', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toBeInTheDocument();
    expect(screen.getByTestId('set-light')).toBeInTheDocument();
    expect(screen.getByTestId('set-dark')).toBeInTheDocument();
    expect(screen.getByTestId('set-system')).toBeInTheDocument();
  });

  it('should default to system theme when no stored theme exists', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
  });

  it('should use stored theme from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should use custom default theme when provided', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should apply light theme class to document when theme is light', () => {
    const mockClassList = document.documentElement.classList;
    
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(mockClassList.add).toHaveBeenCalledWith('light');
  });

  it('should apply dark theme class to document when theme is dark', () => {
    const mockClassList = document.documentElement.classList;
    
    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(mockClassList.add).toHaveBeenCalledWith('dark');
  });

  it('should apply system theme class based on prefers-color-scheme', () => {
    const mockClassList = document.documentElement.classList;
    const mockMatchMedia = vi.fn().mockReturnValue({
      ...mockMediaQueryList,
      matches: true, // Dark mode preferred
    });
    window.matchMedia = mockMatchMedia;
    
    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(mockClassList.add).toHaveBeenCalledWith('dark');
  });

  it('should apply light theme when system prefers light mode', () => {
    const mockClassList = document.documentElement.classList;
    const mockMatchMedia = vi.fn().mockReturnValue({
      ...mockMediaQueryList,
      matches: false, // Light mode preferred
    });
    window.matchMedia = mockMatchMedia;
    
    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(mockClassList.add).toHaveBeenCalledWith('light');
  });

  it('should save theme to localStorage when setTheme is called', () => {
    render(
      <ThemeProvider storageKey="custom-theme">
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByTestId('set-dark').click();
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('custom-theme', 'dark');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should listen for system appearance changes when theme is system', () => {
    const mockMediaQuery = {
      ...mockMediaQueryList,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const mockMatchMedia = vi.fn().mockReturnValue(mockMediaQuery);
    window.matchMedia = mockMatchMedia;
    
    const { unmount } = render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    // Should add event listener for system theme changes
    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    
    // Should remove event listener on cleanup
    unmount();
    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should not listen for system changes when theme is not system', () => {
    const mockMediaQuery = {
      ...mockMediaQueryList,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const mockMatchMedia = vi.fn().mockReturnValue(mockMediaQuery);
    window.matchMedia = mockMatchMedia;
    
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    // Should not add event listener for non-system themes
    expect(mockMediaQuery.addEventListener).not.toHaveBeenCalled();
  });

  it('should update theme when system appearance changes', () => {
    const mockClassList = document.documentElement.classList;
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;
    
    const mockMediaQuery = {
      ...mockMediaQueryList,
      matches: false,
      addEventListener: vi.fn().mockImplementation((event, handler) => {
        if (event === 'change') {
          changeHandler = handler;
        }
      }),
      removeEventListener: vi.fn(),
    };
    
    const mockMatchMedia = vi.fn().mockReturnValue(mockMediaQuery);
    window.matchMedia = mockMatchMedia;
    
    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    // Clear previous calls
    vi.clearAllMocks();

    // Simulate system appearance change to dark mode
    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(mockClassList.add).toHaveBeenCalledWith('dark');
  });

  it('should update theme when system appearance changes to light mode', () => {
    const mockClassList = document.documentElement.classList;
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;
    
    const mockMediaQuery = {
      ...mockMediaQueryList,
      matches: true,
      addEventListener: vi.fn().mockImplementation((event, handler) => {
        if (event === 'change') {
          changeHandler = handler;
        }
      }),
      removeEventListener: vi.fn(),
    };
    
    const mockMatchMedia = vi.fn().mockReturnValue(mockMediaQuery);
    window.matchMedia = mockMatchMedia;
    
    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    // Clear previous calls
    vi.clearAllMocks();

    // Simulate system appearance change to light mode
    act(() => {
      if (changeHandler) {
        changeHandler({ matches: false } as MediaQueryListEvent);
      }
    });

    expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(mockClassList.add).toHaveBeenCalledWith('light');
  });

  it('should not add system change listener when enableSystem is false', () => {
    const mockMediaQuery = {
      ...mockMediaQueryList,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const mockMatchMedia = vi.fn().mockReturnValue(mockMediaQuery);
    window.matchMedia = mockMatchMedia;
    
    render(
      <ThemeProvider defaultTheme="system" enableSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    // Should not add event listener when enableSystem is false
    expect(mockMediaQuery.addEventListener).not.toHaveBeenCalled();
  });

  it('should throw error when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    consoleSpy.mockRestore();
  });

  it('should switch from system to manual theme and stop listening for system changes', () => {
    const mockMediaQuery = {
      ...mockMediaQueryList,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const mockMatchMedia = vi.fn().mockReturnValue(mockMediaQuery);
    window.matchMedia = mockMatchMedia;
    
    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    
    // Switch to manual theme
    act(() => {
      screen.getByTestId('set-light').click();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    
    // Should remove the old listener and not add a new one
    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});