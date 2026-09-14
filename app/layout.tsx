import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { siteHref } from '../lib/base-path';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '「学ぶ」を支援するシステムの開発｜SecHack365 学習駆動コース 川上泰正',
  description: 'AIが理解状態に合わせて学習ルートとスケジュールを設計する、パーソナライズ学習システムの研究開発プロジェクト。',
  icons: { icon: siteHref('/favicon.svg') },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
