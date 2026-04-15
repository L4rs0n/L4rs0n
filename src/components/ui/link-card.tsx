import Link from "next/link";

type LinkCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function LinkCard({
  href,
  eyebrow,
  title,
  description,
}: LinkCardProps) {
  return (
    <Link
      href={href}
      className="surface-card group rounded-[var(--radius-card)] p-6 transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl text-primary-strong">{title}</h2>
      <p className="mt-3 text-base leading-7 text-muted">{description}</p>
      <span className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-accent">
        Explorer la fondation
      </span>
    </Link>
  );
}
