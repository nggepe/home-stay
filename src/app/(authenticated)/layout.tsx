import { NavigationBar } from '@/shared/ui/NavigationBar';
import { FC, PropsWithChildren } from 'react';

const AuthenticatedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-background min-h-full">
      <NavigationBar />
      <div className="h-16"></div>
      <div className="container mx-auto px-4" style={{ minHeight: 'calc(100vh - 60px)' }}>
        {children}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
