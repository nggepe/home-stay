import { Table as RadixTable } from '@radix-ui/themes';

// Header cell interface
export interface ListViewHeaderCell {
  key: string;
  label: string;
  className?: string;
  orderable?: boolean;
}

// Props for ListView, generic over Data
export interface ListViewProps<Data = unknown> {
  headers: ListViewHeaderCell[];
  data: Data[];
}

// ListView component (generic)
export const ListView = <Data,>(props: ListViewProps<Data>) => {
  return <ListViewTable {...props} />; // You can replace this with <ListViewKanban /> if needed
};

// Table version of the list view
const ListViewTable = <Data,>(props: ListViewProps<Data>) => {
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
      <RadixTable.Body></RadixTable.Body>
    </RadixTable.Root>
  );
};
