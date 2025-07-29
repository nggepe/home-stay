import Link from 'next/link';
import css from './breadcrumbs.module.css';

export interface BreadCrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ items, ...props }) => {
  return (
    <div {...props} className={`${css['breadcrumbs']} text-blue-50 gap-2 mt-0 mb-5`}>
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
