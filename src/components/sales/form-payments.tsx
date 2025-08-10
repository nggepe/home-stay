import FormGroup from '@/shared/ui/forms/form-group';
import { DatePicker } from '@/shared/ui/inputs/date-picker';
import { Button, Flex, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';

interface DialogInput {
  amount: number;
  date: Date;
}

interface FormPaymentProps {
  onSubmit: (data: DialogInput) => void;
  onCancel?: () => void;
}

export const FormPayment = ({ onSubmit, onCancel }: FormPaymentProps) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<DialogInput>();

  const HandleOnSubmit = (data: DialogInput) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(HandleOnSubmit)}>
      <FormGroup error={errors.amount?.message}>
        <label htmlFor="amount">Amount</label>
        <TextField.Root type="number" id="amount" {...register('amount', { required: 'Amount is required' })} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="date">Date</label>
        <Controller
          control={control}
          name="date"
          rules={{ required: 'Date is required' }}
          render={({ field }) => (
            <>
              <DatePicker id="checkIn" value={field.value} onSelect={field.onChange} />
              <div className="text-red-500">{errors.date?.message}</div>
            </>
          )}
        />
      </FormGroup>

      <Flex justify={'end'} gap={'3'}>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add</Button>
      </Flex>
    </form>
  );
};
