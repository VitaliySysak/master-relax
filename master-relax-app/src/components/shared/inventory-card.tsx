import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  name: string;
  imgUrl: string;
}

export const InventoryCard: React.FC<Props> = ({ className, name, imgUrl }) => {
  return (
    <div className="flex flex-col items-center font-title">
      <img
        className={cn(
          'w-[clamp(140px,18vw,180px)] aspect-square rounded-full object-cover',
          className
        )}
        src={imgUrl}
        alt={name}
      />
      <p className="text-center mt-4 text-[20px] sm:text-[22px] font-medium">{name}</p>
    </div>
  );
};
