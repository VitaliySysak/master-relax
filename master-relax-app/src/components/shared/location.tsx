import React from 'react';
import { cn } from '@/lib/utils';
import { lat, lng } from '../../../public/data/home-data';

interface Props {
  className?: string;
}

export const Location: React.FC<Props> = ({ className }) => {
  return (
    <section id="location" className={cn('flex flex-col-reverse lg:flex-row justify-center md:pt-20', className)}>
      <iframe
        title="google"
        className="w-full h-[500px] 2xl:h-[600px] rounded-2xl"
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${lat},${lng}`}
      ></iframe>
      <div className="flex flex-col px-12 justify-evenly gap-4 mb-16 text-center">
        <div>
          <h3 className="text-[32px] font-semibold font-title">Адреса</h3>
          <p className="text-[#CBD5E1]">
            м.Львів <br /> Окуневського, 3
          </p>
        </div>
        <div>
          <h3 className="text-[32px] font-semibold font-title">Телефон</h3>
          <p className="text-[#CBD5E1]">+380965181114</p>
        </div>
        <div>
          <h3 className="text-[32px] font-semibold font-title whitespace-nowrap">Графік роботи</h3>
          <p className="text-[#CBD5E1]">
            Пн – Сб: 9:00 – 20:00 <br />
          </p>
        </div>
      </div>
    </section>
  );
};
