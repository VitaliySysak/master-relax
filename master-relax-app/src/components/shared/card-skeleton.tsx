import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface Props {
  className?: string;
}

export const CardSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-evenly cursor-pointer h-[120px] md:h-[138px] border-3 border-[#4a4a55] rounded-2xl p-4',
        className,
      )}
    >
      <div className="flex gap-4 justify-between">
        <Skeleton className="basis-3/4 h-8" />
        <Skeleton className="basis-1/4 h-8" />
      </div>
      <Skeleton className="w-[60px] h-6" />
    </div>
  );
};
