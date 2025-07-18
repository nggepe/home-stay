import { Card, Text } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface DashboardMenuProps {
  title: string;
  /**source of image */
  icon: string;
  link: string;
}

const DashboardMenu: FC<DashboardMenuProps> = ({ title, icon, link }) => {
  return (
    <Link href={link}>
      <Card className="text-center cursor-pointer hover:bg-amber-900 w-20 sm:w-23 md:w-25 lg:w-27 xl:w-30">
        <div className="flex justify-center items-center mb-2">
          <Image width={100} height={100} src={icon} alt={title} />
        </div>
        <Text as="div" size={'1'} className="text-center">
          {title}
        </Text>
      </Card>
    </Link>
  );
};

export default DashboardMenu;
