'use client';

import * as React from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { uk as ukLocale } from 'date-fns/locale';
import { ukUA } from '@mui/x-date-pickers/locales';
import { format } from 'date-fns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, MenuItem } from '@mui/material';
import { Button } from '@/components/ui/button';
import { AppointmentSlot } from '@prisma/client';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSlotSchema, TBookSlotSchema } from '../book-slot/schema';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  slots: AppointmentSlot[];
}

const theme = createTheme(
  {
    palette: { mode: 'dark' },
    typography: { fontFamily: 'Inter, sans-serif' },
  },
  ukUA,
);

export const SlotPicker: React.FC<Props> = ({ className, slots }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const form = useForm<TBookSlotSchema>({
    resolver: zodResolver(bookSlotSchema),
    defaultValues: {
      time: new Date(),
    },
  });

  const onSubmit = async (data: TBookSlotSchema) => {
    try {
      setIsLoading(true);
      alert(data.time);
      form.reset();
      toast.success('надіслано успішно!');
    } catch (error) {
      console.error('Error while execution contact/onSubmit:', error);
      toast.error('сталася помилка при відправленні, спробуйте пізніше', { icon: '❌' });
    } finally {
      setIsLoading(false);
    }
  };

  const availableAppointments = slots.map((slot) => slot.time);
  const availableDays = Array.from(new Set(availableAppointments.map((date) => format(date, 'yyyy-MM-dd'))));

  const timesForSelectedDate = selectedDate
    ? availableAppointments.filter((slot) => format(slot, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    : [];

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ukLocale}
        localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        <FormProvider {...form}>
          <form
            className={cn('relative flex flex-col items-center gap-8 2xl:gap-16', className)}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 w-[300px]">
              <DatePicker
                label="Оберіть дату"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue instanceof Date ? newValue : null)}
                format="dd.MM.yyyy"
                shouldDisableDate={(date) => {
                  const asDate = date instanceof Date ? date : date.toDate?.() ?? new Date(date as any);
                  return !availableDays.includes(format(asDate, 'yyyy-MM-dd'));
                }}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 6],
                        },
                      },
                    ],
                    sx: {
                      '& .MuiPaper-root': {
                        backgroundColor: '#211C2A',
                        border: '2px solid var(--figures)',
                        borderRadius: '12px',
                        color: 'white',
                      },
                    },
                  },
                }}
              />

              <Controller
                name="time"
                control={form.control}
                render={({ field }) => (
                  <TextField
                    select
                    label="Оберіть час"
                    value={field.value?.toISOString() || ''}
                    onChange={(e) => {
                      const selected = new Date(e.target.value);
                      field.onChange(selected);
                    }}
                    disabled={!selectedDate}
                  >
                    {timesForSelectedDate.map((slot, index) => {
                      const dateObj = new Date(slot);
                      return (
                        <MenuItem key={index} value={dateObj.toISOString()}>
                          {dateObj.toLocaleTimeString('uk-UA', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Надсилання...' : 'Записатись'}
            </Button>
          </form>
        </FormProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
