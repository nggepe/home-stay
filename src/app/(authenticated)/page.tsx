'use client';

import DashboardMenu from '@/shared/ui/navigation/dashboard-menu';

export default function Home() {
  return (
    <div
      className="text-center flex justify-center items-center gap-4 flex-wrap"
      style={{ minHeight: 'calc(100vh - 60px)' }}
    >
      <div className="flex flex-wrap gap-4 justify-center">
        <DashboardMenu title="Rooms" icon="/icons/bedroom.png" link="/rooms" />
        <DashboardMenu title="Services" icon="/icons/services.png" link="/services" />
        <DashboardMenu title="Sales" icon="/icons/sales.png" link="/sales" />
      </div>
    </div>
  );
}
