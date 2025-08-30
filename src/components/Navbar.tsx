"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Ana səhifə" },
  { href: "/how-it-works", label: "Necə işləyir?" },
  { href: "/status", label: "Status yoxla" },
  { href: "/managers", label: "Menecerlər üçün" },
  { href: "/about", label: "Haqqımızda / FAQ" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/70 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-lg font-semibold text-transparent">
          Ön Yoxlama Platforması
        </Link>
        <nav className="hidden gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "rounded-md px-3 py-2 text-sm transition-colors " +
                  (active
                    ? "bg-teal-50 text-teal-700"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-teal-700")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/submit"
            className="rounded-md bg-gradient-to-r from-teal-600 to-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
          >
            Xəbər göndər
          </Link>
          <Link href="/auth" className="text-sm text-neutral-700 hover:text-teal-700">
            Daxil ol / Qeydiyyat
          </Link>
        </div>
      </div>
    </header>
  );
}
