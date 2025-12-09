import React from 'react';
import { cn } from '@/lib/utils';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { testemonials, testemonialsTitle } from '../../../public/data/home-data';

interface Props {
  className?: string;
}

export const Testemonials: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn('mt-12', className)}>
      <h1 className="w-full text-center text-[36px] font-semibold font-title my-4">{testemonialsTitle}</h1>
      <InfiniteMovingCards items={testemonials} direction="left" speed="slow" />
    </section>
  );
};
