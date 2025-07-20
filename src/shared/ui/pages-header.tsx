import Head from 'next/head';
import BreadCrumbs, { BreadCrumbsProps } from './breadcrumbs';

export interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadCrumbsProps;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {breadcrumbs && <BreadCrumbs items={breadcrumbs.items} />}
    </>
  );
};

export default PageHeader;
