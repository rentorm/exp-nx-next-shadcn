import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeSwitcher } from './theme-switcher';
import { ThemeProvider } from './theme-provider';

// Mock the theme context
const mockSetTheme = vi.fn();
const mockTheme = 'system';

vi.mock('./theme-provider', async () => {
  const actual = await vi.importActual('./theme-provider');
  return {
    ...actual,
    useTheme: () => ({
      theme: mockTheme,
      setTheme: mockSetTheme,
    }),
  };
});

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
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

  it('should render the theme switcher button', () => {
    render(<ThemeSwitcher />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should show dropdown menu when clicked', () => {
    render(<ThemeSwitcher />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('should call setTheme when light option is selected', () => {
    render(<ThemeSwitcher />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const lightOption = screen.getByText('Light');
    fireEvent.click(lightOption);
    
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should call setTheme when dark option is selected', () => {
    render(<ThemeSwitcher />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const darkOption = screen.getByText('Dark');
    fireEvent.click(darkOption);
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should call setTheme when system option is selected', () => {
    render(<ThemeSwitcher />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const systemOption = screen.getByText('System');
    fireEvent.click(systemOption);
    
    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });

  it('should show correct icons for each theme option', () => {
    render(<ThemeSwitcher />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check for sun icon (light theme)
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    
    // Check for moon icon (dark theme)
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    
    // Check for monitor icon (system theme)
    expect(screen.getByTestId('monitor-icon')).toBeInTheDocument();
  });
});

describe('ThemeSwitcher Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
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

  it('should work with ThemeProvider to switch themes', () => {
    // Reset the mock to use the actual useTheme hook
    vi.restoreAllMocks();
    
    const TestComponent = () => {
      return (
        <ThemeProvider defaultTheme="light">
          <ThemeSwitcher />
        </ThemeProvider>
      );
    };
    
    render(<TestComponent />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const darkOption = screen.getByText('Dark');
    fireEvent.click(darkOption);
    
    // Should save to localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('ui-theme', 'dark');
  });
});