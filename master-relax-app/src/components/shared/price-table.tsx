import React from 'react';
import { cn } from '@/lib/utils';
import { PriceCard } from './price-card';
import { Massage } from '@prisma/client';

interface Props {
  className?: string;
  massages: Massage[];
}

export const PriceTable: React.FC<Props> = ({ className, massages }) => {
  return (
    <table
      className={cn(
        'w-full md:border-2 md:border-[#374151] border-separate border-spacing-0 rounded-2xl overflow-hidden',
        className,
      )}
    >
      <tbody className="flex flex-col gap-4 md:gap-0">
        {massages.map((item, index) => (
          <PriceCard key={index} item={item} />
        ))}
      </tbody>
    </table>
  );
};
