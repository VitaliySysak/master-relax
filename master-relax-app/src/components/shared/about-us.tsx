'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import CountUp from 'react-countup';
import { aboutUsDescription, aboutUsUrl, clientsCount, experienceCount } from '../../../public/data/home-data';

interface Props {
  className?: string;
}

export const AboutUs: React.FC<Props> = ({ className }) => {
  return (
    <section
      id="about-us"
      className={cn(
        'scroll-mt-24 md:scroll-mt-12 flex flex-col sm:flex-row justify-between md:gap-20 lg:gap-40 md:pt-40',
        className,
      )}
    >
      <div className="hidden md:block relative">
        <figure className="absolute rounded-full -top-24 lg:-right-24 xl:-top-32 xl:-right-32 bg-primary h-[220px] w-[220px] xl:h-[280px] xl:w-[280px] -z-10" />
        <img
          className="hidden md:block w-[clamp(300px,40vw,360px)] lg:w-[400px] xl:w-[clamp(400px,30vw,520px)] 2xl:w-[480px] rounded-bl-[180px] 2xl:rounded-bl-[250px] z-10"
          src={aboutUsUrl}
          alt="процес"
        />
      </div>
      <div className="relative bottom-0 md:bottom-12 flex-1">
        <div className="text-center font-title">
          <CountUp
            className="text-[48px] md:text-[40px] lg:text-[48px] 2xl:text-[60px] font-medium"
            duration={3}
            scrollSpyOnce
            enableScrollSpy
            scrollSpyDelay={200}
            end={clientsCount}
            suffix="+"
          />
          <h2 className="text-[28px] md:text-[24px] lg:text-[28px] 2xl:text-[36px] font-medium">
            Задоволених клієнтів
          </h2>
          <CountUp
            className="text-[48px] md:text-[40px] lg:text-[48px] 2xl:text-[60px] font-medium"
            duration={3}
            scrollSpyOnce
            enableScrollSpy
            scrollSpyDelay={200}
            end={experienceCount}
            suffix="+"
          />
          <h3 className="text-[28px] 2xl:text-[36px] font-medium">Років Досвіду</h3>
        </div>
        <p className="text-[18px] xl:text-[20px] 2xl:text-[22px] pt-12 lg:px-4 xl:px-8 2xl:pt-12 2xl:px-20">
          {aboutUsDescription}
        </p>
      </div>
    </section>
  );
};
