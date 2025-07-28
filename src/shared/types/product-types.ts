export interface Product {
  type: 'ROOM' | 'SERVICE';
  name: string;
  price: number;
  description?: string | null;
  id?: number;
  createdAt: Date;
  updatedAt: Date;
}
