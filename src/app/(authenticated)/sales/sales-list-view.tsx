'use client';

import { Sales } from '@/shared/types/sales-types';
import { FC } from 'react';

export interface SalesListViewTable {
  data: Sales[];
}
export const SalesListView: FC<SalesListViewTable> = ({ data }) => {
  console.log(data);
  return <div></div>;
};
