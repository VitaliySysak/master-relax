import React from 'react';
import { cn } from '@/lib/utils';
import { inventoryCards } from '../../../public/data/home-data';
import { InventoryCard } from './inventory-card';

interface Props {
  className?: string;
}

export const Inventory: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn(
        'hidden shadow-2xl sm:block mt-16 md:mt-0 md:relative -top-10 bg-primary w-full rounded-[20px] py-24 px-12 -z-10',
        className,
      )}
    >
      <div className="grid grid-cols-1 grid-rows-6 sm:grid-cols-3 sm:grid-rows-2 gap-12">
        {inventoryCards.map(({ name, imgUrl }, index) => (
          <InventoryCard key={index} name={name} imgUrl={imgUrl} />
        ))}
      </div>
    </section>
  );
};
