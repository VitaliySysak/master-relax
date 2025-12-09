import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import deleteSlot from '@/services/delete-appointment';
import { AppointmentSlotWithClient } from '@/services/get-admin-slots';
import { IoClose } from 'react-icons/io5';

interface Props {
  className?: string;
  slot: AppointmentSlotWithClient;
  onSlotDeleted: () => void;
}

export const AdminAppointmentCard: React.FC<Props> = ({ className, slot, onSlotDeleted }) => {
  return (
    <li
      className={cn(
        'flex flex-col md:flex-row justify-between items-center w-full gap-4 border-2 border-[#4a4a55] rounded-xl bg-[#1d1f26] p-4',
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h3>
          Зарезервовано:{' '}
          {slot.reserved ? (
            <span className="bg-[#16a249] p-2 rounded-2xl">Так</span>
          ) : (
            <span className="bg-[#b62628] p-2 rounded-2xl">Ні</span>
          )}
        </h3>
        <span>Час: {format(new Date(slot.time), 'HH:mm dd-MM-yyyy')}</span>
      </div>
      <div className="flex flex-col gap-2">
        {slot.client && (
          <>
            <span>Ім’я: {slot.client?.fullName}</span>
            <span>Телефон: {slot.client?.phone}</span>
          </>
        )}
      </div>
      <div className="order-[-1] md:order-none w-full md:w-fit flex justify-end">
        <Button
          className="bg-secondary hover:bg-secondary/80 border-none w-10 h-10 p-2"
          onClick={async () => {
            await deleteSlot(slot.id);
            onSlotDeleted();
          }}
        >
          <IoClose className="w-8 h-8" />
        </Button>
      </div>
    </li>
  );
};
