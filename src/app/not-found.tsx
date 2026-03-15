import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
      <div className="glass-panel rounded-3xl px-8 py-12">
        <p className="section-kicker text-sm text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-gradient">
          This route drifted out of orbit.
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          The page you requested is not available. Head back to the portfolio hub and keep
          exploring.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
