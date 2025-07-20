import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Rooms Dashboard</h1>
      </header>
      <main className="flex-1 p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">© 2023 Your Company</footer>
    </div>
  );
};

export default Layout;
