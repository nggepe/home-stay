'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, ChevronDownIcon, Popover, Separator, Spinner, Text, TextField } from '@radix-ui/themes';
import { KeyboardEventHandler, ReactNode, useState, useTransition } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

interface DataInterface {
  display: string;
}
export interface AutocompleteProps<Data extends DataInterface> {
  onSearch: (query: string) => Promise<Data[]>;
  renderItem: (item: Data) => React.ReactNode;
  onSelectedItem?: (item: Data) => void;
  placeholder?: string;
  onRemoveItem?: () => void;
  removable?: boolean;
  onLoadMore?: (query: string, page: number) => Promise<Data[]>;
  errorMessage?: ReactNode;
  actions?: ReactNode;
}

const ACTIVE_INDEX_CLASS_NAME = 'bg-blue-500 text-shadow-white px-2 transition rounded-sm';

export const Autocomplete = <Data extends DataInterface>({
  onSearch,
  renderItem,
  placeholder,
  onSelectedItem,
  onRemoveItem,
  removable,
  onLoadMore,
  errorMessage,
  actions,
}: AutocompleteProps<Data>) => {
  const [results, setResults] = useState<Data[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, startTransition] = useTransition();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const _search = useDebounceCallback(async (val: string) => {
    setOpen(true);
    startTransition(async () => {
      const data = await onSearch(val);
      startTransition(() => {
        setResults(data);
      });
    });
  }, 750);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1 > results.length - 1 ? 0 : prev + 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 < 0 ? results.length - 1 : prev - 1));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSelectedItem(results[activeIndex]);
    }
  };

  const handleOnOpenChange = (open: boolean) => {
    if (open && !results.length) {
      _search('');
    }
    setOpen(open);
  };

  const handleSelectedItem = (item: Data) => {
    setSelectedItem(item);
    onSelectedItem?.(item);
    setOpen(false);
  };

  const handleRemoveItem = () => {
    setSelectedItem(null);
    onRemoveItem?.();
    setOpen(true);
  };

  const handleLoadMore = async () => {
    if (onLoadMore) {
      const data = await onLoadMore(searchText, page + 1);
      setPage(page + 1);
      setResults((prev) => [...prev, ...data]);
    }
  };

  return (
    <div className="relative">
      <Popover.Root onOpenChange={handleOnOpenChange} open={open}>
        <div className="relative">
          <Popover.Trigger>
            <TextField.Root
              value={selectedItem?.display ?? ''}
              onChange={() => setSelectedItem(null)}
              className="w-full"
              placeholder={placeholder}
            >
              <TextField.Slot></TextField.Slot>
              <TextField.Slot>
                <Button variant="ghost" onClick={() => setOpen(true)}>
                  <ChevronDownIcon />
                </Button>
                {selectedItem && removable && (
                  <Button onClick={handleRemoveItem} variant="ghost">
                    <Cross2Icon />
                  </Button>
                )}
              </TextField.Slot>
            </TextField.Root>
          </Popover.Trigger>
          {errorMessage && (
            <Text as="div" color="red">
              {errorMessage}
            </Text>
          )}
        </div>
        <Popover.Content>
          <TextField.Root
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            onChange={(e) => {
              setSearchText(e.target.value);
              _search(e.target.value);
              setPage(1);
            }}
            type="search"
          ></TextField.Root>
          <Separator size={'4'} my={'3'} />
          {!loading && (
            <div className="flex flex-col">
              {results.map((item, index) => {
                return (
                  <div
                    onMouseMove={() => setActiveIndex(index)}
                    style={{ transition: '200ms' }}
                    className={`cursor-pointer py-1 ${activeIndex === index ? ACTIVE_INDEX_CLASS_NAME : ''}`}
                    key={index}
                    onClick={() => {
                      handleSelectedItem(item);
                    }}
                  >
                    {renderItem(item)}
                  </div>
                );
              })}
            </div>
          )}
          {results.length == 0 && <Text align={'center'}>No data available</Text>}
          {loading && (
            <div className="py-2">
              <Spinner />
            </div>
          )}
          <Separator size={'4'} my={'3'} />
          <div className="flex justify-between">
            <div>{actions}</div>
            {onLoadMore && (
              <Button variant="soft" onClick={handleLoadMore} size={'1'}>
                More
              </Button>
            )}
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
