import Link from 'next/link'


const navLinks = [
    { label: "Hombres", href: "/gender/men" },
    { label: "Mujeres", href: "/gender/women" },
    { label: "Niños", href: "/gender/kid" },
    { label: "Uni-sex", href: "/gender/unisex" },
]


export const NavLinks = () => {
    return navLinks.map(({ label, href }) => (
        <Link href={href} key={label} className="m2 p-2 rounded-md transition-all hover:bg-gray-100">
            {label}
        </Link>
    ))
}
