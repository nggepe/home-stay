'use client';

import { Box, Button, Grid, Tabs, Text, TextField } from '@radix-ui/themes';
import { FC, useEffect } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';
import { AutocompleteCustomers } from '../products/autocomplete-customers';
import FormGroup from '@/shared/ui/forms/form-group';
import {
  ListView,
  ListViewAction,
  ListViewData,
  ListViewHeaderCell,
  ListViewWrapper,
} from '@/shared/ui/views/list-view';
import { AllAsReactNode } from '@/shared/types/all-react-node';
import { AutocompleteProduct } from '../products/autocomplete-product';
import { TrashIcon } from '@radix-ui/react-icons';
import { DatePicker } from '@/shared/ui/inputs/date-picker';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { FormPayment } from './form-payments';
import { useAlertDialog } from '@/shared/ui/providers/global-dialog';

interface FormSalesProps {
  onSubmit: (data: FormInput) => void;
  defaultValues?: FormInput;
}

type ACProps = React.ComponentProps<typeof AutocompleteCustomers>;

type CustomerData = Parameters<NonNullable<ACProps['onSelectedItem']>>[0];

type APProps = React.ComponentProps<typeof AutocompleteProduct>;

type ProductData = Parameters<NonNullable<APProps['onSelectedItem']>>[0];

interface OrderLine {
  product?: ProductData;
  quantity?: number;
  price?: number;
  checkIn?: Date | null;
  checkOut?: Date | null;
  subTotal?: number;
}

interface SalesPayment {
  amount: number;
  date: Date;
}

type OrderLineListViewData = AllAsReactNode<OrderLine> & ListViewData;

interface FormInput {
  customer: CustomerData;
  orderLines: OrderLine[];
  bookedAt: Date;
  grandTotal: number;
  totalPayment: number;
  sales_payment: SalesPayment[];
}

const HeaderListView: ListViewHeaderCell[] = [
  {
    label: 'Product',
    key: 'product',
  },
  {
    label: 'Quantity',
    key: 'quantity',
  },
  {
    label: 'Price',
    key: 'price',
  },
  {
    label: 'Subtotal',
    key: 'subTotal',
  },
  {
    label: '',
    key: 'action',
  },
];

const FormSales: FC<FormSalesProps> = ({ onSubmit, defaultValues }) => {
  const dialog = useAlertDialog();
  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInput>({ defaultValues });

  const orderLines = useFieldArray({ control, name: 'orderLines' });
  const payments = useFieldArray({ control, name: 'sales_payment' });

  const renderData = orderLines.fields.map((fields, index) => {
    return RowData({ watch, index, control, setValue, orderLines, errors });
  });

  const orderLinesValues = useWatch({
    control,
    name: 'orderLines',
  }) as OrderLine[] | undefined;

  const paymentLineViews = useWatch({
    control,
    name: 'sales_payment',
  }) as SalesPayment[];

  useEffect(() => {
    const grandTotal = (orderLinesValues ?? []).reduce((acc, line) => acc + (line.subTotal ?? 0), 0);
    setValue('grandTotal', grandTotal);
  }, [orderLinesValues, setValue]);

  useEffect(() => {
    const paymentTotal = (paymentLineViews ?? []).reduce((prev, payment) => prev + Number(payment.amount ?? '0'), 0);
    setValue('totalPayment', paymentTotal);
  }, [paymentLineViews, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid columns={{ lg: '2', md: '1', sm: '1', xs: '1', xl: '3' }} gap={'3'}>
        <Box>
          <FormGroup>
            <label htmlFor="customer">Customer</label>
            <Controller
              control={control}
              name="customer"
              rules={{ required: 'Customer is required' }}
              render={({ field }) => (
                <AutocompleteCustomers
                  placeholder="Select customer"
                  onSelectedItem={field.onChange}
                  errorMessage={errors.customer?.message}
                  inputProps={{ id: 'customer', name: 'customer' }}
                  defaultDisplay={field.value?.display}
                />
              )}
            />
          </FormGroup>
        </Box>
        <Box>
          <FormGroup>
            <label htmlFor="bookedAt">Booked At</label>
            <Controller
              control={control}
              name="bookedAt"
              render={({ field }) => {
                return <DatePicker id="bookedAt" value={field.value} onSelect={field.onChange} />;
              }}
            />
          </FormGroup>
        </Box>
        <Box>
          <FormGroup>
            <label htmlFor="grandTotal">Grand Total</label>
            <TextField.Root id="grandTotal" {...register('grandTotal')} readOnly />
          </FormGroup>
        </Box>
        <Box>
          <FormGroup>
            <label htmlFor="totalPayment">Total Payment</label>
            <TextField.Root id="totalPayment" {...register('totalPayment')} readOnly />
          </FormGroup>
        </Box>
      </Grid>
      <Tabs.Root defaultValue="orderLines">
        <Tabs.List>
          <Tabs.Trigger value="orderLines">Order Lines</Tabs.Trigger>
          <Tabs.Trigger value="sales_payment">Sales Payment</Tabs.Trigger>
        </Tabs.List>
        <Box pt={'3'}>
          <Tabs.Content value="orderLines">
            <ListViewWrapper>
              <ListViewAction search={false} className="mb-2">
                <Button
                  variant="soft"
                  type="button"
                  onClick={() => orderLines.append({ price: 0, quantity: 1, subTotal: 0 })}
                >
                  Add Order Line
                </Button>
              </ListViewAction>
              <ListView<OrderLineListViewData> data={renderData} headers={HeaderListView} />
            </ListViewWrapper>
          </Tabs.Content>
          <Tabs.Content value="sales_payment">
            <ListViewWrapper>
              <ListViewAction search={false} className="mb-2">
                <Button
                  variant="soft"
                  type="button"
                  onClick={() =>
                    dialog.open({
                      title: 'Payment',
                      disableAction: true,
                      form: (
                        <FormPayment
                          onSubmit={(d) => {
                            payments.append(d);
                            dialog.close();
                          }}
                          onCancel={() => {
                            dialog.close();
                          }}
                        />
                      ),
                    })
                  }
                >
                  Add Sales Payment
                </Button>
              </ListViewAction>
              <ListView<AllAsReactNode<SalesPayment> & ListViewData>
                data={
                  payments.fields.map((v, index) => {
                    return {
                      date: <>{format(new Date(v.date), 'dd MMMM yyyy', { locale: enUS })}</>,
                      amount: <>{v.amount}</>,
                      action: (
                        <div className="text-end">
                          <Button variant="outline" color="red" type="button" onClick={() => payments.remove(index)}>
                            <TrashIcon />
                          </Button>
                        </div>
                      ),
                    };
                  }) ?? []
                }
                headers={[
                  {
                    label: 'Amount',
                    key: 'amount',
                  },
                  {
                    label: 'Date',
                    key: 'date',
                  },
                  {
                    label: '',
                    key: 'action',
                  },
                ]}
              />
            </ListViewWrapper>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
      <div className="text-end mt-2">
        <Button variant="classic" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormSales;

interface RowDataProps {
  watch: UseFormWatch<FormInput>;
  index: number;
  control: Control<FormInput, unknown, FormInput>;
  setValue: UseFormSetValue<FormInput>;
  orderLines: UseFieldArrayReturn<FormInput, 'orderLines', 'id'>;
  errors: FieldErrors<FormInput>;
}
const RowData = ({ watch, index, control, setValue, orderLines, errors }: RowDataProps) => {
  const product = watch(`orderLines.${index}.product`);
  const qty = watch(`orderLines.${index}.quantity`);
  const price = watch(`orderLines.${index}.price`);
  const convertDateInOUt = (product: ProductData, qty: number) => {
    if (product?.type === 'ROOM') {
      const now = new Date();
      const nextDate = new Date(now);
      nextDate.setDate(now.getDate() + (qty ?? 0));
      setValue(`orderLines.${index}.checkIn`, now);
      setValue(`orderLines.${index}.checkOut`, nextDate);
      return;
    }
    setValue(`orderLines.${index}.checkIn`, undefined);
    setValue(`orderLines.${index}.checkOut`, undefined);
  };

  return {
    product: (
      <Controller
        control={control}
        name={`orderLines.${index}.product`}
        rules={{ required: 'Product is required' }}
        render={({ field }) => {
          return (
            <>
              <AutocompleteProduct
                onSelectedItem={(item) => {
                  field.onChange(item);
                  setValue(`orderLines.${index}.price`, item.price);
                  setValue(`orderLines.${index}.subTotal`, (qty ?? 0) * item.price);
                  convertDateInOUt(item as ProductData, qty ?? 0);
                }}
                showTypeOnDisplay
                defaultDisplay={product?.display}
              />
              <div className="text-red-500">{errors.orderLines?.[index]?.product?.message}</div>
            </>
          );
        }}
      />
    ),
    quantity: (
      <>
        <Controller
          control={control}
          name={`orderLines.${index}.quantity`}
          rules={{ required: 'Quantity is required' }}
          render={({ field }) => {
            return (
              <>
                <TextField.Root
                  {...field}
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    convertDateInOUt(product as ProductData, Number(e.target.value ?? '0'));
                    setValue(
                      `orderLines.${index}.subTotal`,
                      (Number(e.target.value ?? '0') ?? 0) * Number(price ?? '0'),
                    );
                  }}
                />
                <div className="text-red-500">{errors.orderLines?.[index]?.quantity?.message}</div>
              </>
            );
          }}
        />
        {product?.type === 'ROOM' && (
          <>
            <FormGroup className="mt-3">
              <label htmlFor={`orderLines.${index}.checkIn`}>
                <Text as="span" size={'1'}>
                  Check In
                </Text>
              </label>
              <Controller
                control={control}
                name={`orderLines.${index}.checkIn`}
                rules={{ validate: () => product?.type === 'ROOM' || 'Required to input check in date' }}
                render={({ field }) => {
                  return (
                    <>
                      <DatePicker id="checkIn" value={field.value} onSelect={field.onChange} />
                      <div className="text-red-500">{errors.orderLines?.[index]?.checkIn?.message}</div>
                    </>
                  );
                }}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor={`orderLines.${index}.checkOut`}>
                <Text as="span" size={'1'}>
                  Check Out
                </Text>
              </label>
              <Controller
                control={control}
                name={`orderLines.${index}.checkOut`}
                rules={{ validate: () => product?.type === 'ROOM' || 'Required to input check out date' }}
                render={({ field }) => {
                  return (
                    <>
                      <DatePicker id="checkOut" value={field.value} onSelect={field.onChange} />
                      <div className="text-red-500">{errors.orderLines?.[index]?.checkOut?.message}</div>
                    </>
                  );
                }}
              />
            </FormGroup>
          </>
        )}
      </>
    ),
    price: (
      <Controller
        control={control}
        name={`orderLines.${index}.price`}
        rules={{ required: 'Price is required' }}
        render={({ field }) => {
          return (
            <>
              <TextField.Root
                {...field}
                type="number"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setValue(`orderLines.${index}.subTotal`, (Number(e.target.value ?? '0') ?? 0) * (qty ?? 0));
                }}
              />
              <div className="text-red-500">{errors.orderLines?.[index]?.price?.message}</div>
            </>
          );
        }}
      />
    ),
    subTotal: (
      <Text as="div" align={'right'}>
        {watch(`orderLines.${index}.subTotal`)}
      </Text>
    ),
    action: (
      <div className="text-end">
        <Button variant="outline" color="red" type="button" onClick={() => orderLines.remove(index)}>
          <TrashIcon />
        </Button>
      </div>
    ),
  };
};
