import React from 'react';
import { cn } from '@/lib/utils';
import { navBarLinks } from '../../../public/data/home-data';
import Link from 'next/link';
import { RiCloseLargeLine } from 'react-icons/ri';

import { useClickAway } from 'react-use';

interface Props {
  className?: string;
  onClose: () => void;
  isOpen: boolean;
}

export const Drawer: React.FC<Props> = ({ className, onClose, isOpen }) => {
  const ref = React.useRef(null);
  useClickAway(ref, onClose);

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        ref={ref}
        className={cn(
          'absolute left-0 right-0 top-0 mx-auto h-[320px] bg-background rounded-b-3xl p-8 z-50 shadow-2xl',
          'transition-all duration-300 ease-out',
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0',
          className,
        )}
      >
        <div className="flex justify-end">
          <RiCloseLargeLine className="cursor-pointer" onClick={onClose} />
        </div>

        <ul className="flex flex-col h-full items-center font-bold text-[28px] justify-evenly p-4 pt-0">
          {navBarLinks.map(({ title, href }, index) => (
            <li key={index} className="hover:underline underline-offset-4 decoration-2 decoration-blue-500">
              {href === '/#bookMassage' ? (
                <Link href={{ pathname: '/', hash: 'bookMassage' }}>{title}</Link>
              ) : (
                <Link href={href}>{title}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
