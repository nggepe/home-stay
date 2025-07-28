'use client';

import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, Card, Table as RadixTable, Text, TextField } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, HtmlHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { PaginationRepositoryResponse } from '../types/pagination-types';

// Header cell interface
export interface ListViewHeaderCell {
  key: string;
  label: ReactNode;
  className?: string;
  orderable?: boolean;
}

export type ListViewData = Record<string, ReactNode>;

// Props for ListView, generic over Data
export interface ListViewProps<Data extends ListViewData = ListViewData> {
  headers: ListViewHeaderCell[];
  data: Data[];
}

// ListView component (generic)
export const ListView: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>; // You can replace this with <ListViewKanban /> if needed
};

// Table version of the list view
export const ListViewTable = <Data extends ListViewData>(props: ListViewProps<Data>) => {
  const { headers } = props;

  return (
    <RadixTable.Root variant="surface" className="hidden lg:block">
      <RadixTable.Header>
        <RadixTable.Row>
          {headers.map((header) => (
            <RadixTable.ColumnHeaderCell key={header.key} className={header.className}>
              {header.label}
            </RadixTable.ColumnHeaderCell>
          ))}
        </RadixTable.Row>
      </RadixTable.Header>
      <RadixTable.Body>
        {props.data.map((row, index) => {
          return (
            <RadixTable.Row key={index}>
              {headers.map((header) => {
                return <RadixTable.Cell key={header.key}>{row[header.key]}</RadixTable.Cell>;
              })}
            </RadixTable.Row>
          );
        })}
      </RadixTable.Body>
    </RadixTable.Root>
  );
};

export const ListViewKanban = <Data extends ListViewData>(props: ListViewProps<Data>) => {
  return (
    <div className="block lg:hidden">
      {props.data.map((item, index) => {
        return (
          <Card key={index}>
            <table>
              <tbody>
                {props.headers.map((header) => {
                  return (
                    <tr key={header.key}>
                      <th>{header.label}</th>
                      <td>{item[header.key]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        );
      })}
    </div>
  );
};

export interface ListViewActionProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  search?: boolean;
}

export const ListViewAction: FC<ListViewActionProps> = ({ children, search, ...props }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const _search = useDebounceCallback((val: string) => {
    if (!val) {
      router.push('?');
      return;
    }
    router.push(`?search=${val}`);
  }, 750);

  if (search != false) {
    return (
      <div {...props} className={`flex items-center justify-between mb-3 ${props.className || ''}`}>
        <TextField.Root
          type="search"
          defaultValue={searchParams.get('search') || ''}
          onChange={(e) => {
            const val = e.target.value;
            _search(val);
          }}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
        {children}
      </div>
    );
  }

  return <div {...props}>{children}</div>;
};

export type ListViewPaginationProps = Pick<PaginationRepositoryResponse<unknown>, 'pagination'> &
  HtmlHTMLAttributes<HTMLDivElement>;

export const ListViewPagination: FC<ListViewPaginationProps> = ({ pagination, ...props }) => {
  return (
    <div {...props} className={`flex justify-end gap-3 items-center ${props.className || ''}`}>
      <Button variant="soft" disabled={pagination.prev === undefined}>
        <ChevronLeftIcon />
      </Button>
      {<Text>{pagination.page}</Text>}
      <Button variant="soft" disabled={pagination.next === undefined}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
