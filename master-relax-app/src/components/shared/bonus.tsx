import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  title: string;
}

export const Bonus: React.FC<Props> = ({ className, title }) => {
  return (
    <div className={cn('flex items-center bg-[#374151] py-1 px-3 rounded-2xl gap-1', className)}>
      <figure className="w-2 h-2 bg-secondary rounded-full" />
      <p className='text-[14px] text-[#9CA3AF]'>{title}</p>
    </div>
  );
};
