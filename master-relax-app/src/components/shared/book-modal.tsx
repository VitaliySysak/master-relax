'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorText } from '../ui/error-text';
import bookSlot from '@/services/book-slot';
import { BookCalendar } from './book-calendar';
import toast from 'react-hot-toast';
import { ChooseMassage } from './choose-massage';
import { AppointmentInput } from '../ui/appointment-input';
import { cn } from '@/lib/utils';
import { FiUser } from 'react-icons/fi';
import { bookSlotSchema, TBookSlotSchema } from '@/schemas/book-slot-schema';
import { isAxiosError } from 'axios';

interface Props {
  className?: string;
  onClose: () => void;
}

export const BookModal: React.FC<Props> = ({ className, onClose }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState<1 | 2 | 3>(1);

  const stepFields = {
    1: ['massageType'],
    2: ['time'],
    3: ['fullName', 'phone'],
  } as const;

  const nextStep = async () => {
    const fieldsToValidate = stepFields[step] || [];
    const isValid = await form.trigger(fieldsToValidate, { shouldFocus: true });
    if (isValid) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const prevStep = () => {
    setStep((prev) => {
      if (prev === 3) return 2;
      if (prev === 2) return 1;
      return 1;
    });
  };

  const isNextDisabled = () => {
    if (step === 1) return !form.watch('massageType');
    if (step === 2) return !form.watch('time');
    if (step === 3) return !form.watch('fullName') && !form.watch('phone');
    return false;
  };

  const form = useForm<TBookSlotSchema>({
    resolver: zodResolver(bookSlotSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      time: '',
      massageType: '',
      slotId: '',
    },
  });

  const onSubmit = async (data: TBookSlotSchema) => {
    try {
      setIsLoading(true);
      await bookSlot(data);

      form.reset();
      toast.success('Очікуйте, масажист зв’яжеться з вами найближчим часом');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.data?.code === 'SLOT_ALREADY_RESERVED') {
          toast.error('Цей слот вже зайнятий іншим користувачем', { icon: '⚠️' });
        } else {
          toast.error('Сталася помилка при відправленні, спробуйте пізніше', {
            icon: '❌',
          });
        }
      } else {
        toast.error('Немає з’єднання з сервером.');
      }
      console.error('Error in onSubmit:', error);
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={cn('w-full h-full max-h-[90vh] flex flex-col overflow-hidden', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {step === 1 && (
          <>
            <div className="flex-1 min-h-0 overflow-hidden">
              <ChooseMassage />
            </div>
            {form.formState.errors.massageType?.message && (
              <ErrorText errorText={form.formState.errors.massageType.message} />
            )}
            <div className="flex justify-end w-full">
              <Button
                type="button"
                className="text-white bg-[#d34545] hover:bg-[#c14142]"
                onClick={nextStep}
                disabled={!form.watch('massageType')}
              >
                Далі
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex-1 min-h-0 overflow-hidden">
              <BookCalendar date={date} setDate={setDate} />
            </div>
            {form.formState.errors.time?.message && <ErrorText errorText={form.formState.errors.time.message} />}
            <div className="flex justify-between w-full">
              <Button onClick={prevStep}>Назад</Button>
              <Button
                type="button"
                className="text-white bg-[#d34545] hover:bg-[#c14142]"
                onClick={nextStep}
                disabled={isNextDisabled()}
              >
                Далі
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex-1 min-h-0 overflow-hidden">
              <div className="flex flex-col w-full mt-24 gap-4">
                <div className="flex items-center w-full gap-2">
                  <FiUser color="#d34545" />
                  <h3 className="text-[20px] font-medium">Ваші данні</h3>
                </div>
                <div className="w-full flex flex-col gap-4">
                  <AppointmentInput name="fullName" placeholder="Ім’я" />
                  <AppointmentInput name="phone" placeholder="Номер телефону" />
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <Button onClick={prevStep}>Назад</Button>
              <Button
                type="submit"
                loading={isLoading}
                className="text-white bg-[#d34545] hover:bg-[#c14142] min-w-16"
                disabled={isNextDisabled()}
              >
                Записатись
              </Button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};
