import Head from 'next/head';
import BreadCrumbs, { BreadCrumbsProps } from '../breadcrumbs/breadcrumbs';
import { Separator } from '@radix-ui/themes';

export interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadCrumbsProps;
  actions?: React.ReactNode[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, actions }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4 mt-3">{title}</h1>
      <div className="flex justify-between">
        {breadcrumbs && <BreadCrumbs items={breadcrumbs.items} />}
        <div>{actions}</div>
      </div>
      <Separator my="3" size="4" />
    </>
  );
};

export default PageHeader;
