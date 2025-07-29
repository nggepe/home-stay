import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './globals.css';
import { ToastProvider } from '@/shared/ui/providers/global-toast';
import NextTopLoader from 'nextjs-toploader';
import { AlertDialogProvider } from '@/shared/ui/providers/global-dialog';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HS32 Malang',
  description: 'HomeStay 32 Malang',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme accentColor="brown" appearance="dark" panelBackground="translucent">
          <AlertDialogProvider>
            <ToastProvider>
              <NextTopLoader color="#CCFEBC" />
              {children}
            </ToastProvider>
          </AlertDialogProvider>
        </Theme>
      </body>
    </html>
  );
}
