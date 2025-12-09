import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  errorText: string;
}

export const ErrorText: React.FC<Props> = ({ className, errorText }) => {
  return <div className={cn('flex text-[18px]', className)}>{errorText && <p className="text-red-500">{errorText}</p>}</div>;
};
