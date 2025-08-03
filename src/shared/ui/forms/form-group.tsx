import { FC, PropsWithChildren, ReactNode } from 'react';

export interface FormGroupProps extends PropsWithChildren {
  error?: ReactNode;
  className?: string;
}

export const FormGroup: FC<FormGroupProps> = ({ children, error, className }) => {
  return (
    <div className={`flex flex-col gap-1 mb-3 ${className}`}>
      {children}
      {error && <div className="text-red-400">{error}</div>}
    </div>
  );
};

export default FormGroup;
