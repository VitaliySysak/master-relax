'use client';
import React, { useEffect, useState, createContext, JSX } from 'react';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { ImageProps } from 'next/image';

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  title: string;
  quote: string;
  src: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      const maxScrollLeft = scrollWidth - clientWidth;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft) < Math.floor(maxScrollLeft));
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -500, behavior: 'smooth' });
      setTimeout(checkScrollability, 500);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 500, behavior: 'smooth' });
      setTimeout(checkScrollability, 500);
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className={cn('absolute right-0 z-8 h-auto w-[5%] overflow-hidden bg-gradient-to-l')}></div>

          <div className={cn('flex flex-row justify-start gap-4 md:gap-6')}>
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: 'easeOut',
                  },
                }}
                key={'card' + index}
                className="rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex justify-end gap-2">
          <button
            aria-label="left"
            className="relative z-8 flex h-12 w-12 md:h-15 md:w-15 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-5 w-5 md:h-7 md:w-7 text-gray-500" />
          </button>
          <button
            aria-label="right"
            className="relative z-8 flex h-12 w-12 md:h-15 md:w-15 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-5 w-5 md:h-7 md:w-7 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, layout = false }: { card: Card; layout?: boolean }) => {
  return (
    <>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        className="relative z-8 flex h-[344px] w-62 md:w-[360px] md:h-[520px] 2xl:w-[480px] 2xl:h-[720px] flex-col items-start justify-start overflow-hidden rounded-2xl lg:rounded-4xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-4 md:p-8">
          <motion.p
            layoutId={layout ? `category-${card.quote}` : undefined}
            className="text-left font-sans text-sm font-medium text-white md:text-base"
          >
            {card.quote}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left text-xl font-semibold [text-wrap:balance] text-white md:text-3xl font-title"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage src={card.src} alt={card.title} className="absolute inset-0 z-10 object-cover" />
      </motion.button>
    </>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  return (
    <img
      className={cn('h-full md:h-full transition duration-300 w-full', className)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : 'Background of a beautiful view'}
      {...rest}
    />
  );
};
