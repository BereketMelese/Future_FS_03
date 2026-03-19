import Link from "next/link";
import { cloneElement, isValidElement } from "react";

const styles = {
  solid:
    "accent-gradient text-[var(--background)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(198,139,89,0.38)] shadow-[0_8px_24px_rgba(198,139,89,0.35)]",
  ghost:
    "bg-transparent border border-[rgba(245,233,220,0.3)] text-[var(--secondary)] hover:-translate-y-0.5 hover:border-[rgba(245,233,220,0.46)] hover:bg-[rgba(245,233,220,0.12)]",
  subtle:
    "bg-[rgba(245,233,220,0.1)] text-[var(--secondary)] hover:-translate-y-0.5 hover:bg-[rgba(245,233,220,0.2)]",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function Button({
  children,
  className = "",
  variant = "solid",
  size = "md",
  asChild = false,
  href,
  ...props
}) {
  const combined = `inline-flex items-center justify-center rounded-full font-medium transition duration-200 ${sizes[size]} ${styles[variant]} ${className}`;

  if (asChild && href) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  if (asChild) {
    if (isValidElement(children)) {
      return cloneElement(children, {
        className: `${combined} ${children.props.className || ""}`.trim(),
        ...props,
      });
    }

    return <span className={combined}>{children}</span>;
  }

  return (
    <button type="button" className={combined} {...props}>
      {children}
    </button>
  );
}
