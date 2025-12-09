'use client';
import { Container } from '@/components/shared/container';
import { ReservationForm } from '@/components/shared/dashboard/add-slots-form';
import { AppointmentList } from '@/components/shared/dashboard/appointment-list';
import { Skeleton } from '@/components/ui/skeleton';
import getAdminSlots, { AppointmentSlotWithClient } from '@/services/get-admin-slots';
import React from 'react';

export default function Dashboard() {
  const [slots, setSlots] = React.useState<AppointmentSlotWithClient[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchSlots = async () => {
    setLoading(true);
    const data = await getAdminSlots();
    setSlots(data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchSlots();
  }, []);
  return (
    <main>
      <Container>
        {!slots && <span>помилка завантаження данних</span>}
        <ReservationForm onSlotAdded={fetchSlots} />
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold my-2">Усі Записи</h2>
        </div>

        {loading ? (
          [...Array(5)].map((_, i) => (
            <li
              key={i}
              className="flex justify-between items-center w-full gap-4 border-2 border-[#4a4a55] rounded-xl bg-[#1d1f26] p-4"
            >
              <div>
                <Skeleton className="h-[60px] w-[300px]" />
              </div>
              <Skeleton className="h-8 w-12" />
            </li>
          ))
        ) : (
          <AppointmentList className="mt-4" slots={slots} onSlotDeleted={fetchSlots} />
        )}
      </Container>
    </main>
  );
}
