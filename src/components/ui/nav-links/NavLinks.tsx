import Link from 'next/link';

const navLinks = [
  { label: 'Hombres', href: '/gender/men' },
  { label: 'Mujeres', href: '/gender/women' },
  { label: 'Niños', href: '/gender/kid' },
  { label: 'Uni-sex', href: '/gender/unisex' },
];

export const NavLinks = () => {
  return navLinks.map(({ label, href }) => (
    <Link
      href={href}
      key={label}
      className="m2 p-2 transition-all hover:border-b-2 hover:border-b-primary"
    >
      {label}
    </Link>
  ));
};
