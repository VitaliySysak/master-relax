'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Video: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn('w-full mb-8 md:mb-0 md:p-16', className)}>
      <div className="relative w-full pb-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-3xl"
          src="https://www.youtube.com/embed/icWkG0Kbuyo?autoplay=1&mute=1&loop=1&playlist=icWkG0Kbuyo"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};
