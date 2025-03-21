import { NavMenu } from "@/components/nav-content";
import Av from "../../components/Foobar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-accent flex h-15 cursor-pointer items-center justify-between px-4 py-8">
        <Link
          className="flex scroll-m-20 items-center justify-center gap-2 text-2xl font-extrabold tracking-tight text-nowrap"
          href="/"
        >
          <Av />
          <h1>IQ&apos;s Random React Stuff</h1>
        </Link>
      </header>
      <nav className="bg-muted border-b-2 pb-2">
        <NavMenu />
      </nav>
      <main className="m-2 flex h-[calc(100vh-200px)] items-center justify-center">
        {children}
      </main>
    </div>
  );
}
