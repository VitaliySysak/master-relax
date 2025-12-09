import { localBusinessJsonLd } from '@/lib/seo';
import './globals.css';
import { Providers } from '@/components/shared/providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://master-relax.com.ua'),
  icons: {
    icon: '/icons/master-relax.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://master-relax.com.ua',
    title: 'Масаж у Львові — Master Relax',
    description:
      'Преміум масаж у Львові для здоров’я, краси та гармонії. Класичний, релакс, антицелюлітний та інші види масажу. Запис онлайн — Master Relax.',
    siteName: 'Master Relax',
    locale: 'uk_UA',
    images: [
      { url: 'https://master-relax.com.ua/images/opengraph-image.png', width: 1200, height: 630, alt: 'Preview image' },
    ],
  },
  manifest: '/manifest.json',
  robots: { index: true, follow: true },
  other: {
    'google-site-verification': 'rL2ohyaPB9EAdzkm6VZIEu1O93R5NuaNU3GQI1jqCcw',
    'x-git-commit': process.env.NEXT_PUBLIC_GIT_HASH || 'dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        ></script>
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
