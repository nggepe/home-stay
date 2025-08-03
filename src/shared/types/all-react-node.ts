import { ReactNode } from 'react';

export type AllAsReactNode<T> = {
  [K in keyof T]: ReactNode;
};
