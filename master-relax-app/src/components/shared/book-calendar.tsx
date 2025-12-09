import React from 'react';
import { Calendar } from '../ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimeSlotSelector } from './time-slot-selector';
import getSlots from '@/services/get-appointments';
import { AppointmentSlot } from '@prisma/client';
import { LuCalendar } from 'react-icons/lu';
import { MdAccessTime } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Props {
  className?: string;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const BookCalendar: React.FC<Props> = ({ className, date, setDate }) => {
  const [selectedSlot, setSelectedSlot] = React.useState<AppointmentSlot | null>(null);
  const [open, setOpen] = React.useState(false);
  const [slots, setSlots] = React.useState<AppointmentSlot[]>([]);

  React.useEffect(() => {
    (async () => {
      const slots = await getSlots();
      setSlots(slots);
    })();
  }, []);

  const availableDays = React.useMemo(() => {
    const freeSlots = slots.filter((slot) => !slot.reserved);
    const formattedDates = freeSlots.map((slot) => format(new Date(slot.time), 'yyyy-MM-dd'));
    return new Set(formattedDates);
  }, [slots]);

  return (
    <div className={cn('flex flex-col gap-8 w-full', className)}>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <LuCalendar color="#d34545" />
          <h2>Дата</h2>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className={
                'bg-[#2f2f37] border-[#4a4a55] justify-between font-normal border-3 w-full h-[70px] rounded-lg text-lg hover:border-secondary/50 hover:bg-[#2f2f37] text-[#a6a6a6] hover:text-white'
              }
            >
              <span className="flex justify-center items-center text-xl gap-4 ">
                <LuCalendar className={date && 'text-white'} />
                {date ? <h3 className="text-white">{date.toLocaleDateString()}</h3> : <h3>Оберіть дату</h3>}
              </span>
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 border border-border bg-[#22222b] text-white"
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
              showOutsideDays={true}
              disabled={(day) => {
                const formatted = format(day, 'yyyy-MM-dd');
                return !availableDays.has(formatted);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <MdAccessTime color="#d34545" />
          <h2>Час</h2>
        </div>
        <TimeSlotSelector
          name="time"
          slots={slots}
          selectedDate={date}
          selectedSlot={selectedSlot}
          onSelect={(slot) => {
            setSelectedSlot(slot);
          }}
        />
      </div>
    </div>
  );
};
