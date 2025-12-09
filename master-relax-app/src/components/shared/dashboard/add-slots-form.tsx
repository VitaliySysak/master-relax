'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { createSlotSchema, TCreateSlotSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import createSlot from '@/services/create-appointment';
import { AdminAddSlotForm } from '@/components/ui/admin-add-slot-form';
import { format } from 'date-fns';

interface Props {
  className?: string;
  onSlotAdded: () => void;
}

export const ReservationForm: React.FC<Props> = ({ className, onSlotAdded }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TCreateSlotSchema>({
    resolver: zodResolver(createSlotSchema),
    defaultValues: {
      reserved: false,
      time: '',
    },
  });

  const onSubmit = async (data: TCreateSlotSchema) => {
    try {
      setIsLoading(true);
      await createSlot(data);
      onSlotAdded();
      form.reset();
      toast.success(format(new Date(data.time), 'yyyy-MM-dd HH:mm') + ' додано успішно!');
    } catch (error) {
      console.error('Error while execution contact/onSubmit:', error);
      toast.error('сталася помилка при відправленні, спробуйте пізніше', { icon: '❌' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn('p-8 bg-primary my-4 rounded-2xl', className)}>
      <FormProvider {...form}>
        <h1 className="text-center font-bold mb-4">Створити новий часовий слот для запису</h1>
        <form className="relative flex flex-col items-center gap-8 2xl:gap-12" onSubmit={form.handleSubmit(onSubmit)}>
          <AdminAddSlotForm name="time" />
          <Button
            loading={isLoading}
            className="w-[260px] text-[16px] py-6 px-16 lg:py-6 lg:px-20 rounded-[20px] font-bold bg-[#292A2E]"
          >
            ДОДАТИ СЛОТ
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
