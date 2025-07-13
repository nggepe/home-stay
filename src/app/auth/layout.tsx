import { FC } from 'react';

const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="app-background h-screen w-screen flex items-center justify-center">{children}</div>;
};

export default AuthLayout;
