'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  Home,
  Package,
  Database,
  Layers,
  Settings,
  LineChart
} from "lucide-react"

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Namespaces', href: '/namespaces', icon: Package },
  { name: 'Datastores', href: '/datastores', icon: Database },
  { name: 'Layers', href: '/layers', icon: Layers },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Analytics', href: '#', icon: LineChart }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              {
                'bg-muted text-primary': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="h-4 w-4" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
