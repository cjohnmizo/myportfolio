import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* 404 Badge */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[var(--accent)]/20 blur-xl rounded-full" />
                        <div className="w-24 h-24 relative z-10 flex items-center justify-center">
                            <span className="text-6xl font-extrabold text-accent-gradient">404</span>
                        </div>
                    </div>
                </div>

                {/* Text */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-[var(--fg)]">
                        Page Not Found
                    </h1>
                    <p className="text-[var(--fg-secondary)]">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                {/* CTA */}
                <div className="pt-4">
                    <Link
                        href="/"
                        className="btn-primary inline-flex"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
