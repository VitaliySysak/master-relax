import React from 'react';
import { cn } from '@/lib/utils';
import { Bonus } from './bonus';
import { Button } from '../ui/button';
import { Massage } from '@prisma/client';
import Link from 'next/link';

interface Props {
  className?: string;
  item: Massage;
}

export const PriceCard: React.FC<Props> = ({ className, item }) => {
  const { name, price, durationMin, bonuses, discountFrom, discountPrice } = item;
  return (
    <tr
      className={cn(
        'flex flex-col md:flex-row justify-between p-4 border-1 border-[#374151] bg-[#2a2e37]',
        'md:rounded-none rounded-2xl',
        'md:hover:scale-none',
        className,
      )}
    >
      <td className="flex flex-col gap-2">
        <h3 className="text-[20px] md:text-[28px]">{name}</h3>
        <div className="flex gap-2 mt-2 flex-wrap mb-4">
          {bonuses.map((bonus, index) => (
            <Bonus key={index} title={bonus} />
          ))}
        </div>
      </td>
      <td className="flex flex-row md:flex-col items-center justify-center">
        <div className="text-right flex flex-col-reverse md:flex-row justify-between w-full items-start md:items-center">
          <Link className="w-full md:w-fit mr-0 md:mr-8" href="/#contact-form">
            <Button className="px-6">Записатись</Button>
          </Link>
          <div className="mb-4 flex md:min-w-[240px]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-start md:justify-end">
                <span className="text-[16px] text-[#9CA3AF]">Один сеанс</span>
                <div>
                  <span className="text-[20px] font-bold text-secondary">₴{price}</span>
                  <span className="text-[16px] text-[#9CA3AF]">/ {durationMin} хв</span>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <span className="text-[16px] text-[#9CA3AF]">Від {discountFrom} сеансів</span>
                <div>
                  <span className="text-[20px] font-bold text-[#169344]">₴{discountPrice}</span>
                  <span className="text-[16px] text-[#9CA3AF]">/ {durationMin} хв</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};
