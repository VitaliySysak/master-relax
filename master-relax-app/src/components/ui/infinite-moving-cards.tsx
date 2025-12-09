'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState, useCallback } from 'react';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    photoUrl: string;
    quote: string;
    mark: number;
  }[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--animation-direction', direction === 'left' ? 'forwards' : 'reverse');
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const duration = speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s';
      containerRef.current.style.setProperty('--animation-duration', duration);
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isInteracting && isMobile) {
      timeout = setTimeout(() => setIsInteracting(false), 5000);
    }
    return () => clearTimeout(timeout);
  }, [isInteracting, isMobile]);

  const handleInteraction = () => {
    if (isMobile) {
      setIsInteracting(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleInteraction}
      onMouseLeave={() => isMobile && setIsInteracting(false)}
      onTouchStart={handleInteraction}
      className={cn(
        'relative z-5 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        isMobile && isInteracting ? 'overflow-x-auto cursor-grab' : 'overflow-hidden',
        'scroll-smooth',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full h-[510px] md:h-[420px] shrink-0 flex-nowrap gap-4 py-4',
          start && !(isMobile && isInteracting) && 'animate-scroll',
          pauseOnHover && !isMobile && 'hover:[animation-play-state:paused]',
        )}
        style={isMobile && isInteracting ? { animationPlayState: 'paused' } : undefined}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[464px] max-w-full shrink-0 rounded-2xl border px-4 py-3 md:px-8 md:py-6 md:w-[660px] border-zinc-700 bg-[#1A1C2B]"
            key={idx}
          >
            <blockquote className="flex flex-col justify-between cursor-default h-full">
              <span className="relative z-10 text-sm leading-[1.6] text-[18px] text-gray-100 whitespace-pre-line">
                {item.quote}
              </span>
              <div className="relative z-10 mt-2 md:mt-6 flex flex-row items-center justify-between">
                <span className="flex flex-col gap-1">
                  <img src={item.photoUrl} className="w-[48px] h-[48px] rounded-full object-cover" alt={item.name} />
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.name}
                  </span>
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <img className="w-[28px] h-[28px]" key={index} src="/icons/star.webp" alt="зірка" />
                  ))}
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
