import type { Metadata } from 'next';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export const metadata: Metadata = {
  title: 'Ціни на масаж у Львові – Master Relax',
  description:
    'Актуальні ціни на масаж у Львові від Master Relax. Класичний, спортивний, лікувальний, антицелюлітний та інші види масажу за доступною вартістю.',
  alternates: { canonical: '/prices' },
};

export default function PricesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
