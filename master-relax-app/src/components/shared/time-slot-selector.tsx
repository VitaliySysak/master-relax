import { cn } from '@/lib/utils';
import { AppointmentSlot } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TimeSlotSelectorProps {
  slots: AppointmentSlot[];
  selectedDate: Date | undefined;
  selectedSlot: AppointmentSlot | null;
  name: string;
  onSelect: (slot: AppointmentSlot) => void;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  selectedDate,
  selectedSlot,
  name,
  onSelect,
}) => {
  const { setValue, trigger } = useFormContext();

  const filteredSlots = selectedDate
    ? slots.filter((slot) => {
        const slotDate = new Date(slot.time);
        return slotDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  return (
    <div className="rounded-lg text-white shadow-sm p-4 min-h-[160px] border-3 border-[#4a4a55]">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 min-h-[112px] items-center justify-center">
        {selectedDate ? (
          filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <button
                type="button"
                key={slot.id}
                disabled={slot.reserved}
                onClick={() => {
                  onSelect(slot);
                  setValue(name, new Date(slot.time).toISOString());
                  setValue('slotId', slot.id);
                  trigger(name);
                }}
                data-selected={selectedSlot?.id === slot.id}
                className={cn(
                  'text-[16px] cursor-pointer inline-flex border-[#3b3b45] items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background text-white px-4 py-2 h-14 transition-all duration-200 hover:border-[#84363a] hover:bg-secondary/10',
                  selectedSlot?.id === slot.id && 'bg-secondary border-none hover:bg-[#c14142]',
                )}
              >
                {format(new Date(slot.time), 'HH:mm')}
              </button>
            ))
          ) : (
            <p className="text-sm text-[#a6a6a6] col-span-full text-center">Немає доступних годин у цей день</p>
          )
        ) : (
          <p className="text-[16px] text-[#a6a6a6] col-span-full text-center">Оберіть дату</p>
        )}
      </div>
    </div>
  );
};
