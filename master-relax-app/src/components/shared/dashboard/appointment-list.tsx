import React from 'react';
import { cn } from '@/lib/utils';
import { AdminAppointmentCard } from './admin-appointment-card';
import { AppointmentSlotWithClient } from '@/services/get-admin-slots';

interface Props {
  className?: string;
  slots: AppointmentSlotWithClient[];
  onSlotDeleted: () => void;
}

export const AppointmentList: React.FC<Props> = ({ className, slots, onSlotDeleted }) => {
  return (
    <ul className={cn('flex flex-col gap-2', className)}>
      {slots.map((slot) => (
        <AdminAppointmentCard key={slot.id} slot={slot} onSlotDeleted={onSlotDeleted} />
      ))}
    </ul>
  );
};
