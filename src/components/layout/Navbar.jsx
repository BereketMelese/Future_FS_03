"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled
          ? "border-b border-[rgba(245,233,220,0.12)] bg-[rgba(20,20,20,0.85)] backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <Link
          href="/"
          className="ml-3 text-xl tracking-wide text-(--secondary) transition duration-200 hover:text-(--accent)"
        >
          Addis Cup
        </Link>
        <nav className="hidden items-center gap-6 md:flex mr-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname === link.href
                  ? "text-(--accent)"
                  : "text-[rgba(245,233,220,0.8)] hover:text-(--secondary) hover:-translate-y-0.5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/menu"
          className="rounded-full border border-[rgba(245,233,220,0.2)] px-4 py-2 text-sm transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(245,233,220,0.38)] hover:bg-[rgba(245,233,220,0.12)] md:hidden"
        >
          Explore
        </Link>
      </div>
    </header>
  );
}
