import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="app-background h-screen w-screen flex items-center justify-center">{children}</div>;
};

export default AuthLayout;
