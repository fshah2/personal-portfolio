import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import Script from 'next/script';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
});

const title = 'Fenil Shah'

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Fenil Shah',
  },
  description:
    'Senior Software Engineer based in Houston, TX, building business-critical, full-stack systems across C#/.NET, TypeScript, and Python: web platforms, REST APIs, and data integrations.',
  keywords: [
    'Software Engineer',
    'Full-stack Engineer',
    'C#',
    '.NET',
    'TypeScript',
    'Python',
    'React',
    'Next.js',
    'AWS',
    'REST APIs',
  ],
  authors: [{ name: 'Fenil Shah' }],
  creator: 'Fenil Shah',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Fenil Shah',
    title,
    description:
      'Senior Software Engineer based in Houston, TX, building full-stack systems across C#/.NET, TypeScript, and Python.',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description:
      'Senior Software Engineer based in Houston, TX, building full-stack systems across C#/.NET, TypeScript, and Python.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      data-scroll-behavior='smooth'
      className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable}`}>
      <body className='font-sans antialiased bg-background'>
        {process.env.NEXT_PUBLIC_UMAMI_ID && (
          <Script
            src='https://cloud.umami.is/script.js'
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            strategy='afterInteractive'
          />
        )}
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
