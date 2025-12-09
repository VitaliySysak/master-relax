import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'px-[clamp(12px,3vw,40px)] md:px-[60px] xl:px-[clamp(60px,8vw,200px)] pt-[60px] sm:pt-[80px]',
        className,
      )}
    >
      {children}
      <div className="absolute inset-y-0 left-0 h-full w-px">
        <div className="absolute -top-6 sm:-top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent z-50" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px">
        <div className="absolute -top-6 sm:-top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent z-50" />
      </div>
    </div>
  );
};
