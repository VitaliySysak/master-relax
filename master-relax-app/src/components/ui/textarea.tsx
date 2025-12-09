import * as React from 'react';

import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { ErrorText } from './error-text';

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  placeholder: string;
}

export const Textarea: React.FC<Props> = ({ className, name, ...props }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const errorText = errors[name]?.message as string;

  return (
    <label className={cn('relative w-full', className)}>
      <textarea
        {...props}
        data-slot="textarea"
        className={cn(
          'w-full min-h-[120px] border-secondary placeholder:text-input text-[18px] lg:text-[20px] 2xl:text-[24px] focus-visible:border-ring focus-visible:ring-ring/50  flex field-sizing-content rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...register(name)}
      />
      <ErrorText errorText={errorText} />
    </label>
  );
};
