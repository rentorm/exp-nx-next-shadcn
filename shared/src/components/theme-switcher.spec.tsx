import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeSwitcher } from './theme-switcher';

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

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the theme switcher button', () => {
    render(<ThemeSwitcher />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});