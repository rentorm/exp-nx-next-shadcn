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

describe('ThemeProvider - System Appearance Change Detection', () => {
  let mockMediaQueryList: any;
  let mockMatchMedia: any;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    // Mock MediaQueryList
    mockMediaQueryList = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
    
    // Mock matchMedia
    mockMatchMedia = vi.fn().mockReturnValue(mockMediaQueryList);
    Object.defineProperty(window, 'matchMedia', {
      value: mockMatchMedia,
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

  it('should listen for system appearance changes when theme is system', () => {
    function TestComponent() {
      const { setTheme } = useTheme();
      return (
        <button onClick={() => setTheme('system')}>
          Set System Theme
        </button>
      );
    }

    const { unmount } = render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    // Switch to system theme
    act(() => {
      screen.getByRole('button').click();
    });

    // Should add event listener for system theme changes
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    
    // Should remove event listener on cleanup
    unmount();
    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should update DOM classes when system appearance changes', () => {
    const mockClassList = document.documentElement.classList;
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;
    
    // Capture the change handler
    mockMediaQueryList.addEventListener = vi.fn().mockImplementation((event, handler) => {
      if (event === 'change') {
        changeHandler = handler;
      }
    });
    
    function TestComponent() {
      return <div>Test Component</div>;
    }

    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    // Clear previous calls to focus on the change event
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

  it('should update DOM classes when system appearance changes to light mode', () => {
    const mockClassList = document.documentElement.classList;
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;
    
    // Capture the change handler
    mockMediaQueryList.addEventListener = vi.fn().mockImplementation((event, handler) => {
      if (event === 'change') {
        changeHandler = handler;
      }
    });
    
    // Start with dark mode preferred
    mockMediaQueryList.matches = true;
    
    function TestComponent() {
      return <div>Test Component</div>;
    }

    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    // Clear previous calls to focus on the change event
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

  it('should not listen for system changes when theme is manually set', () => {
    function TestComponent() {
      const { setTheme } = useTheme();
      return (
        <div>
          <button data-testid="set-light" onClick={() => setTheme('light')}>
            Set Light
          </button>
          <button data-testid="set-system" onClick={() => setTheme('system')}>
            Set System
          </button>
        </div>
      );
    }

    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    // Initially listening for system changes
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    
    // Switch to manual theme
    act(() => {
      screen.getByTestId('set-light').click();
    });

    // Should remove the listener when switching away from system theme
    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    
    // Clear and switch back to system
    vi.clearAllMocks();
    act(() => {
      screen.getByTestId('set-system').click();
    });

    // Should add listener again when switching back to system theme
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should apply correct theme based on system preference', () => {
    const mockClassList = document.documentElement.classList;
    
    // Test dark mode preference
    mockMediaQueryList.matches = true;
    mockMatchMedia.mockReturnValue(mockMediaQueryList);
    
    function TestComponent() {
      return <div>Test Component</div>;
    }

    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(mockClassList.add).toHaveBeenCalledWith('dark');
  });

  it('should save theme preference to localStorage', () => {
    function TestComponent() {
      const { setTheme } = useTheme();
      return (
        <button onClick={() => setTheme('dark')}>
          Set Dark
        </button>
      );
    }

    render(
      <ThemeProvider storageKey="custom-theme">
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByRole('button').click();
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('custom-theme', 'dark');
  });
});