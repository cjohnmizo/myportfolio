import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
      <div className="surface-card rounded-lg px-8 py-12">
        <p className="section-kicker text-secondary text-sm font-semibold">
          404
        </p>
        <h1 className="text-foreground mt-4 text-4xl font-semibold">
          Page not found
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl text-base">
          The page you requested is not available. Return to the portfolio
          homepage or use the main navigation.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground mt-8 inline-flex rounded-md px-5 py-3 text-sm font-semibold transition hover:bg-secondary"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
