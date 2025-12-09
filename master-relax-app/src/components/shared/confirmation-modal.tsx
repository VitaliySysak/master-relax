'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '../ui/button';

interface Props {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmationModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-6 text-center">
        <DialogTitle className="text-xl font-semibold text-[#d34545]">Дякуємо за запис!</DialogTitle>
        <DialogDescription className="text-md mt-2">
          Очікуйте, масажист зв’яжеться з вами найближчим часом
        </DialogDescription>
        <div className="mt-6">
          <Button onClick={() => onClose(false)} className="bg-[#d34545] hover:bg-[#c14142] text-white">
            Закрити
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
