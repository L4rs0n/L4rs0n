import type { PropsWithChildren } from "react";

type PageShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export function PageShell({
  children,
  eyebrow,
  title,
  description,
}: PageShellProps) {
  return (
    <main className="app-shell flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="surface-card rounded-[var(--radius-panel)] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-5xl leading-none text-primary-strong sm:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
            {description}
          </p>
        </header>
        {children}
      </div>
    </main>
  );
}
