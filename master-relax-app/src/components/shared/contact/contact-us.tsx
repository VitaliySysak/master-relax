'use client';

import React, { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, TContactSchema } from './schema';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { contactUrl } from '../../../../public/data/home-data';
import { CheckForm } from '../check-form';
import sendMessage from '@/services/send-message';
import { BookNow } from '../book-now';

interface Props {
  className?: string;
}

export const ContactUs: React.FC<Props> = ({ className }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
      isPhoneContact: false,
    },
  });

  const onSubmit = async (data: TContactSchema) => {
    try {
      setIsLoading(true);
      await sendMessage(data);
      form.reset();
      toast.success('Очікуйте, масажист звяжеться з вами найближчим часом');
    } catch (error) {
      console.error('Error while execution contact/onSubmit:', error);
      toast.error('сталася помилка при відправленні, спробуйте пізніше', { icon: '❌' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn('', className)}>
      <Suspense fallback={<div>Завантаження...</div>}>
        <BookNow />
      </Suspense>
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-16 2xl:gap-32 pt-24">
        <div
          id="contact-form"
          className=" scroll-mt-24 bg-primary w-full lg:flex-[3] rounded-2xl px-4 py-6 md:p-10 2xl:p-12 shadow-2xl"
        >
          <FormProvider {...form}>
            <form
              className="relative flex flex-col items-center gap-8 2xl:gap-12"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <h1 className="w-full text-[28px] lg:text-[32px] xl:text-[42px] 2xl:text-[48px] font-semibold font-title text-center">
                Зв’яжіться з нами
              </h1>
              <FormInput name="fullName" placeholder="Ім’я" autoComplete="name" />
              <FormInput name="phone" placeholder="Номер телефону" type="phone" autoComplete="tel" />
              <FormInput name="email" placeholder="Пошта" autoComplete="email" />
              <div className="w-full flex flex-col gap-4">
                <Textarea name="message" placeholder="Коментар" autoComplete="off" />
                <CheckForm name="isPhoneContact" label="Зателефонувати?" />
              </div>
              <Button
                loading={isLoading}
                className="w-[260px] text-[16px] py-6 px-16 lg:py-6 lg:px-20 rounded-[20px] font-bold bg-[#292A2E]"
              >
                ЗАПИСАТИСЬ НА МАСАЖ
              </Button>
            </form>
          </FormProvider>
        </div>
        <aside className="lg:flex-[2] flex flex-col items-center gap-8">
          <div className="md:px-4">
            <img
              className="rounded-2xl h-[460px] lg:w-[320px] xl:w-[360px] 2xl:w-[400px] lg:h-[380px] 2xl:h-[460px]  shadow-2xl"
              src={contactUrl}
              alt="массажист"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[36px] lg:text-[28px] 2xl:text-[36px] font-semibold font-title">
              Ваше тіло заслуговує турботи
            </h2>
            <p className="text-[18px]">
              Бажаєте записатися на масаж або отримати консультацію? Заповніть форму — і ми обов’язково зв’яжемося з
              вами якнайшвидше.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};
