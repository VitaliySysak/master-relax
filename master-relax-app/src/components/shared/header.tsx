'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Drawer } from '../ui/drawer';
import { navBarLinks } from '../../../public/data/home-data';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  return (
    <header className={cn('fixed bg-background w-full h-[60px] sm:h-[80px] font-title font-semibold z-10', className)}>
      <div className="flex justify-between items-center px-[clamp(20px,6vw,40px)] md:px-[60px] xl:px-[clamp(40px,8vw,260px)] h-full">
        <Link href="/">
          <img
            className="w-[200px] h-[44px] md:w-[280px] md:h-[60px] lg:w-[320px] lg:h-[70px]"
            src="/images/logo.webp"
            alt="logo"
          />
        </Link>
        <nav className="h-[80px] flex items-center relative">
          {/* Mobile */}
          <>
            <button aria-label="open nav menu">
              <RxHamburgerMenu
                onClick={() => setIsDrawerOpen((prev) => !prev)}
                className="block sm:hidden w-[30px] h-[30px] cursor-pointer"
              />
            </button>
            <Drawer onClose={() => setIsDrawerOpen(false)} isOpen={isDrawerOpen} />
          </>

          {/* Desktop */}
          <ul
            className={cn(
              'hidden sm:flex justify-between gap-[clamp(20px,4vw,40px)] text-[16px] md:text-[18px] lg:text-[24px]',
            )}
          >
            {navBarLinks.map(({ title, href }, i) => (
              <li key={i} className="hover:underline underline-offset-4 decoration-2 decoration-blue-500">
                {href === '/#bookMassage' ? <a href="/#bookMassage">{title}</a> : <Link href={href}>{title}</Link>}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <hr className="border-0 h-[2px] bg-primary w-full" />
    </header>
  );
};
