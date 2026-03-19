import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(245,233,220,0.1)] bg-[rgba(16,16,16,0.8)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="section-shell flex flex-col gap-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>2026 Addis Cup Coffee House. Crafted with care.</p>
        <div className="flex gap-4">
          <Link
            href="/contact"
            className="transition duration-200 hover:-translate-y-0.5 hover:text-(--accent)"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="transition duration-200 hover:-translate-y-0.5 hover:text-(--accent)"
          >
            Story
          </Link>
        </div>
      </div>
    </footer>
  );
}
