import React from 'react';
import { cn } from '@/lib/utils';
import { Massage } from '@prisma/client';
import { useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
  massage: Massage;
  name: string;
  isSelected?: boolean;
  onSelect: () => void;
}

export const BookMassageCard: React.FC<Props> = ({ className, massage, name, isSelected, onSelect }) => {
  const { setValue, trigger } = useFormContext();
  return (
    <div
      onClick={() => {
        onSelect();
        setValue(name, massage.name);
        setValue('duration', massage.durationMin);
        trigger(name);
      }}
      className={cn(
        'flex flex-col justify-evenly cursor-pointer h-[120px] md:h-[138px] border-3 border-[#4a4a55] rounded-2xl p-4 md:py-6 transition-all duration-300 hover:border-[#84363a] hover:shadow-lg',
        isSelected && 'bg-[#34262e] border-[#d34545] hover:border-[#d34545]',
        className,
      )}
    >
      <div className="flex justify-between">
        <h3 className="text-white text-[20px] font-bold">{massage.name}</h3>
        <span className="text-[#d34545] font-semibold">₴{massage.price}</span>
      </div>
      <span className="text-[16px] text-[#a6a6a6]">{massage.durationMin} хв</span>
    </div>
  );
};
