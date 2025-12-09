import React from 'react';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label: string;
}

export const CheckForm: React.FC<Props> = ({ className, name, label, ...props }) => {
  const { register } = useFormContext();

  return (
    <div className={cn('flex items-center gap-2 w-full', className)}>
      <input
        className="flex items-center justify-center text-[16px] appearance-none w-5 h-5 rounded bg-primary border border-secondary checked:bg-secondary checked:after:content-['✔'] "
        type="checkbox"
        id="checkbox"
        placeholder="✔️"
        {...props}
        {...register(name)}
      />
      <Label className="text-input text-[16px]" htmlFor="checkbox">
        {label}
      </Label>
    </div>
  );
};
