'use client';

import { TextField } from '@radix-ui/themes';
import { DropdownMenu } from '@radix-ui/themes';

export const Autocomplete = () => {
  return (
    <div className="relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <TextField.Root type="search"></TextField.Root>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={() => console.log('Item 1 selected')}>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          <DropdownMenu.Item>Item 3</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
