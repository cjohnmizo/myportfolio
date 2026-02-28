import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <section className="surface w-full max-w-lg p-8 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-[var(--fg)] sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--fg-soft)]">
          The page you requested is unavailable or has moved.
        </p>

        <div className="mt-8">
          <Link href="/" className="button-primary">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
