import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { useFormContext } from 'react-hook-form';
import { ErrorText } from './error-text';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
}

export const FormInput: React.FC<Props> = ({ className, name, ...props }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const errorText = errors[name]?.message as string;

  return (
    <label className={cn('relative w-full', className)}>
      <div className="pt-2">
        <Input
          {...props}
          className={cn(
            'text-white focus-visible:border-ring text-[18px] lg:text-[20px] 2xl:text-[24px] placeholder:text-input border-b border-b-secondary bg-transparent pb-4 h-8',
          )}
          {...register(name)}
        />
      </div>
      <ErrorText errorText={errorText} />
    </label>
  );
};
