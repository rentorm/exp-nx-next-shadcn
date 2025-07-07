import '@my-org/shared';
import { ThemeProvider } from '@my-org/shared';

export const metadata = {
  title: 'Welcome to @my-org/web',
  description: 'A modern Nx monorepo with Next.js and ShadCN components',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
