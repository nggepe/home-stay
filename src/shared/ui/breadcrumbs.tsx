import Link from 'next/link';
import css from './breadcrumbs.module.css';

export interface BreadCrumbsProps {
  items: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ items }) => {
  return (
    <div className={`${css['breadcrumbs']} text-blue-50 gap-2 mt-4`}>
      {items.map((item, index) => (
        <div key={item.href} className="flex gap-2">
          <Link className={css[item.active ? 'active' : '']} href={item.href}>
            {item.label}
          </Link>
          {index !== items.length - 1 && <span> / </span>}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
