import '@my-org/shared/styles/globals.css';
import { Providers } from '../components/providers';

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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
