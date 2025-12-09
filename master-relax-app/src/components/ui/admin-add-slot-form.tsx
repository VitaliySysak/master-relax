import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createTheme, ThemeProvider } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import 'dayjs/locale/uk';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface Props {
  name: string;
}

export const AdminAddSlotForm: React.FC<Props> = ({ name }) => {
  const { control } = useFormContext();
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="uk"
        localeText={{
          okButtonLabel: 'Підтвердити',
          cancelButtonLabel: 'Скасувати',
          todayButtonLabel: 'Сьогодні',
          fieldDayPlaceholder: () => 'ДД',
          fieldMonthPlaceholder: () => 'ММ',
          fieldYearPlaceholder: () => 'РРРР',
          fieldHoursPlaceholder: () => 'ГГ',
          fieldMinutesPlaceholder: () => 'хх',
        }}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={null}
          rules={{ required: 'Date is required' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DateTimePicker
              value={value ? dayjs(value) : null}
              onChange={(newValue) => {
                const isoString = newValue?.toISOString() ?? '';
                onChange(isoString);
              }}
              disablePast
              views={['year', 'month', 'day', 'hours', 'minutes']}
              ampm={false}
              slotProps={{
                textField: {
                  error: !!error,
                  helperText: error?.message,
                } as any,
              }}
            />
          )}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
