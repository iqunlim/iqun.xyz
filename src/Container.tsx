import { Outlet, useNavigate } from "react-router-dom";
import { NavMenu } from "./components/nav-content";
import { ModeToggle } from "./components/theme/mode-toggle";
import Av from "./Foobar";

export default function ContainerPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-accent flex h-15 cursor-pointer items-center justify-between px-4 py-8">
        <div
          className="flex scroll-m-20 items-center justify-center gap-2 text-2xl font-extrabold tracking-tight text-nowrap"
          onClick={() => navigate("/")}
        >
          <Av />
          <h1>IQ's Random React Stuff</h1>
        </div>
        <ModeToggle />
      </header>
      <nav className="bg-muted border-b-2 pb-2">
        <NavMenu />
      </nav>
      <main className="m-2 flex h-[calc(100vh-200px)] items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
