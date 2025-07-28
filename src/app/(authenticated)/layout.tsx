import { NavigationBar } from '@/shared/ui/navigation-bar';
import { FC, PropsWithChildren } from 'react';

const AuthenticatedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-background min-h-full">
      <NavigationBar />
      <div className="h-16"></div>
      <div className="container mx-auto px-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {children}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
