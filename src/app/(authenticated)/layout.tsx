import { FOOTER_COPYRIGHT } from '@/configs/constants';
import { NavigationBar } from '@/shared/ui/navigation-bar';
import { FC, PropsWithChildren } from 'react';

const AuthenticatedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-background min-h-full">
      <NavigationBar />
      <div className="h-16"></div>
      <div className="container mx-auto px-4" style={{ minHeight: 'calc(100vh - 60px - 60px)' }}>
        {children}
      </div>
      <footer className="bg-gray-950 text-white py-4 text-center">
        <p>{FOOTER_COPYRIGHT}</p>
      </footer>
    </div>
  );
};

export default AuthenticatedLayout;
