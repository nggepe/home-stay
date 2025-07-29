import { FC, PropsWithChildren, ReactNode } from 'react';

export interface FormGroupProps extends PropsWithChildren {
  error?: ReactNode;
}

export const FormGroup: FC<FormGroupProps> = ({ children, error }) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      {children}
      {error && <div className="text-red-400">{error}</div>}
    </div>
  );
};

export default FormGroup;
