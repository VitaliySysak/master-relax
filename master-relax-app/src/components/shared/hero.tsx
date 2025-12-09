'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { heroDescription, heroUrl } from '../../../public/data/home-data';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Props {
  className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn('md:h-screen pb-[60px] sm:pb-[60px] flex justify-between items-center', className)}>
      <div className="flex flex-col sm:flex-row items-center justify-center">
        <div className="flex flex-col gap-12 mt-8">
          <h1 className="w-full px-2 sm:px-0 text-[26px] md:text-[32px] lg:text-[42px] xl:text-[42px] 2xl:text-[50px] font-semibold opacity-0 animate-[fadeUp_1s_ease-out_forwards]">
            Розслаблення і відновлення <br /> в одному дотику - <br /> преміум масаж <br /> у Львові від Master Relax
          </h1>
          <div className="relative md:hidden mt-4">
            <figure className="absolute rounded-full -left-2 -top-12 border-4 border-[var(--figures)] h-[100px] w-[100px]" />
            <img className="w-full rounded-[40px] px-2 " src={heroUrl} alt="головна" />
          </div>
          <p className="text-[18px] md:text-[16px] lg:text-[20px] 2xl:text-[22px] md:max-w-[360px] lg:max-w-[500px] 2xl:lg:max-w-[700px] opacity-0 animate-[fadeUp_1s_ease-out_forwards]">
            {heroDescription}
          </p>
          <Link className="flex justify-center md:justify-start" href="/#contact-form">
            <Button className="bg-gradient-to-r from-[#211c2a] to-[#49323a] hover:from-[#49323a] hover:to-[#49323a] text-shadow-2xs text-[20px] py-6 px-20 lg:py-8 lg:px-24 w-fit rounded-[25px] font-bold">
              Зв’язатись
            </Button>
          </Link>
        </div>
      </div>
      <aside className="hidden md:flex h-fit flex-col justify-center relative">
        <figure className="absolute rounded-full -left-8 xl:-left-12 top-0 border-4 border-[var(--figures)] h-[120px] w-[120px] xl:h-[150px] xl:w-[150px]" />
        <img
          className="w-[clamp(300px,40vw,360px)] lg:w-[400px] xl:w-[clamp(400px,30vw,500px)] 2xl:w-[500px] rounded-t-[124px] rounded-b-[8px] xl:rounded-t-[150px] 2xl:rounded-t-[164px] shadow-2xl"
          src={heroUrl}
          alt="головна"
        />
      </aside>
    </section>
  );
};
