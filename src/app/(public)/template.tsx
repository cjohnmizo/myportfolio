import { PageTransition } from "@/components/portfolio/page-transition";

export default function PublicTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
