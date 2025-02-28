import { Outlet } from "react-router-dom";
import { NavMenu } from "./components/nav-content";

export default function ContainerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background flex h-20 items-center gap-2 border-2 px-1 sm:px-5">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-nowrap">
          IQ's Random React Stuff
        </h1>
      </header>
      <nav className="m-2">
        <NavMenu />
      </nav>
      <main className="mx-2 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
