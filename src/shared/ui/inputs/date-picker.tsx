'use client';
import { HTMLInputProps } from '@/shared/types/html-input';
import { Popover, TextField } from '@radix-ui/themes';
import { CalendarCheck } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export interface DatePickerProps extends Omit<HTMLInputProps, 'defaultValue' | 'type' | 'name'> {
  value?: Date | null;
  onSelect?: (date?: Date) => void;
}
export const DatePicker: FC<DatePickerProps> = ({ value, onSelect, id, className, placeholder }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Date>();
  const handleOnSelected = (date?: Date) => {
    setSelected(date);
    onSelect?.(date);
    setOpen(false);
  };

  useEffect(() => {
    setSelected(value ?? undefined);
  }, [value]);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <TextField.Root onFocus={() => setOpen(true)} id={id} className={className} placeholder={placeholder}>
        <TextField.Slot>
          {selected ? format(selected, 'dd MMMM yyyy', { locale: enUS }) : 'Select a date'}
        </TextField.Slot>
        <TextField.Slot>
          <CalendarCheck />
        </TextField.Slot>
      </TextField.Root>
      <Popover.Trigger>
        <div className="w-full"></div>
      </Popover.Trigger>
      <Popover.Content
        style={{
          width: 'auto',
          minWidth: 0,
          display: 'inline-block',
        }}
      >
        <DayPicker
          animate
          mode="single"
          selected={selected}
          onSelect={handleOnSelected}
          footer={selected ? `Selected: ${selected.toLocaleDateString()}` : 'Pick a day.'}
        />
      </Popover.Content>
    </Popover.Root>
  );
};
