import Link from 'next/link';

interface Props {
  icon: React.ReactNode;
  label: string;
  href: string;
  onCloseMenu(): void;
}

const NavItem = ({ label, href, icon, onCloseMenu }: Props) => (
  <Link
    href={href}
    onClick={onCloseMenu}
    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
  >
    {icon}
    <span className="ml-3 text-xl">{label}</span>
  </Link>
);

export default NavItem;
