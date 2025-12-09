export const dynamic = 'force-dynamic';

import { PriceTable } from '@/components/shared/price-table';
import { priceListTitle } from '../../../../public/data/prices-data';
import { Container } from '@/components/shared/container';
import getMassages from '@/services/get-prices';
import { Massage } from '@prisma/client';

export default async function Prices() {
  let massages: Massage[] = [];

  try {
    massages = await getMassages();
  } catch (error) {
    console.error('Failed to fetch massages:', error);
  }

  return (
    <main>
      <Container>
        <div className="flex flex-col my-8">
          <h1 className="text-center text-[28px] lg:text-[36px] 2xl:text-[48px] font-medium font-title">Преміальний догляд за тілом</h1>
          <h2 className="text-center text-[16px] lg:text-[20px] 2xl:text-[32px] text-[#CBD5E1]">{priceListTitle}</h2>
        </div>

        {massages.length > 0 ? (
          <PriceTable massages={massages} />
        ) : (
          <p className="text-center text-red-500 my-8">Не вдалося завантажити ціни. Спробуйте пізніше.</p>
        )}
      </Container>
    </main>
  );
}
