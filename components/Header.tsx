'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Timeline AI', href: '/changelog' },
    { name: 'Directory AI', href: '/directory' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-white/[0.08] dark:bg-zinc-950/80">
      {/* We use max-w-5xl to keep the header nicely contained, or you can use w-full depending on your overall layout preference */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Left: Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 focus:outline-none"
        >
          {/* Subtle logo icon (optional, gives that premium tech feel) */}
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-white transition-transform group-hover:scale-105 dark:bg-white dark:text-zinc-950">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tighter text-zinc-900 dark:text-zinc-50">
            Nalara
          </span>
        </Link>

        {/* Right: Navigation */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            // Check if current path starts with the href (so /direktori/tools still highlights Directory)
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-bold tracking-tight transition-colors duration-200 focus:outline-none ${isActive
                  ? 'text-zinc-900 dark:text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}