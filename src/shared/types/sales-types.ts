import { Customer } from './customer-types';

export interface Sales {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  customerId: number;
  bookedAt: Date | null;
  grandTotal: number;
  customer: Pick<Customer, 'id' | 'name' | 'phone'>;
  code: string;
}
