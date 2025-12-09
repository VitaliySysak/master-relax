import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { socialMedias } from '../../../public/data/home-data';
import { IoLocationSharp } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer
      className={cn(
        'mt-12 flex flex-col justify-between bg-primary min-h-[400px] px-[clamp(20px,6vw,40px)] md:px-[60px] xl:px-[clamp(40px,8vw,260px)]',
        className,
      )}
    >
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center py-4 md:py-0 min-h-[80px] sm:min-h-[96px] md:min-h-[120px] 2xl:h-[112px]">
          <Link href="/">
            <img
              className="w-[200px] h-[44px] md:w-[280px] md:h-[60px] lg:w-[350px] lg:h-[80px]"
              src="/images/logo.webp"
              alt="лого"
            />
          </Link>
          <div className="flex gap-8">
            {socialMedias.map(({ name, imgUrl, link }, index) => (
              <Link className="py-4 md:py-0" target="_blank" key={index} href={link}>
                <img className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]" src={imgUrl} alt={name} />
              </Link>
            ))}
          </div>
        </div>
        <hr className="border-0 h-[2px] bg-figures w-full" />
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <h2 className="text-center sm:text-left text-[20px] lg:text-[24px] py-8 lg:py-0 px-4 md:px-0">
          З любов’ю до вашого тіла — професійний масаж{' '}
          <span className="hidden md:inline">
            <br />
          </span>{' '}
          для здоров’я, краси та гармонії щодня.
        </h2>
        <div className="flex flex-col items-center md:items-end my-6 md:my-0 text-[20px] lg:text-[24px]">
          <div className="flex justify-end gap-4 items-center">
            <FaPhoneAlt />
            <p>+380965181114</p>
          </div>
          <div className="flex justify-end gap-2 items-center">
            <IoLocationSharp className="w-[30px] h-[30px]" />
            <p>м. Львів Окуневського 3</p>
          </div>
          <div className="flex justify-end gap-4 items-center">
            <TfiEmail />
            <p>master.relax.lviv@gmail.com</p>
          </div>
        </div>
      </div>
      <p className="text-[20px] uppercase w-full text-center font-title mb-4">
        © {new Date().getFullYear()} master relax
      </p>
    </footer>
  );
};
