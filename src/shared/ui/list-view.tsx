'use client';

import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, Card, Table as RadixTable, Separator, Text, TextField } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, HtmlHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { PaginationRepositoryResponse } from '../types/pagination-types';
import Image from 'next/image';

// Header cell interface
export interface ListViewHeaderCell {
  key: string;
  label: ReactNode;
  className?: string;
  orderable?: boolean;
}

export type ListViewData = Record<string, ReactNode> & {
  action?: ReactNode;
  detailRoute?: string;
};

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
  const router = useRouter();

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
            <RadixTable.Row key={index} className={row.detailRoute ? 'hover:bg-[#0000004d]' : ''}>
              {headers.map((header) => {
                if (header.key === 'action') {
                  return <RadixTable.Cell key={header.key}>{row[header.key]}</RadixTable.Cell>;
                }
                return (
                  <RadixTable.Cell
                    className={row.detailRoute ? 'cursor-pointer' : ''}
                    onClick={() => row.detailRoute && router.push(row.detailRoute)}
                    key={header.key}
                  >
                    {row[header.key]}
                  </RadixTable.Cell>
                );
              })}
            </RadixTable.Row>
          );
        })}
      </RadixTable.Body>
    </RadixTable.Root>
  );
};

export const ListViewKanban = <Data extends ListViewData>(props: ListViewProps<Data>) => {
  const router = useRouter();
  if (props.data.length === 0) {
    return (
      <Card className="py-6 w-full">
        <Image width={250} height={250} src={'/no-data.svg'} alt="no data" className="mx-auto" />
        <Text align={'center'} size={'6'} as="div" className="m-5">
          No data available
        </Text>
      </Card>
    );
  }
  return (
    <div className="block lg:hidden">
      {props.data.map((item, index) => {
        return (
          <Card key={index} className="mb-3">
            <table className="w-full" onClick={() => item.detailRoute && router.push(item.detailRoute)}>
              <tbody>
                {props.headers.map((header) => {
                  if (header.key == 'action') {
                    return null;
                  }
                  return (
                    <tr key={header.key}>
                      <td className="text-start">{header.label}</td>
                      <th className="text-end">{item[header.key]}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {item.action && (
              <>
                <Separator className="w-full" my="3" size={'4'} />
                <div className="flex justify-end">{item.action}</div>
              </>
            )}
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
  const params = useSearchParams();
  const router = useRouter();

  const goToNext = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.set('page', pagination.next?.toString() || '1');
    router.push(`?${searchParams.toString()}`);
  };

  const goToPrev = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.set('page', pagination.prev?.toString() || '1');
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div {...props} className={`flex justify-end gap-3 items-center ${props.className || ''}`}>
      <Button variant="soft" disabled={pagination.prev === undefined} onClick={goToPrev}>
        <ChevronLeftIcon />
      </Button>
      {<Text>{pagination.page}</Text>}
      <Button variant="soft" disabled={pagination.next === undefined} onClick={goToNext}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
