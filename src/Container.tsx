import { Outlet } from "react-router-dom";
import { NavMenu } from "./components/nav-content";

export default function ContainerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background flex h-15 items-center px-6">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-nowrap">
          IQ's Random React Stuff
        </h1>
      </header>
      <nav className="ml-2 border-b-2 pb-2">
        <NavMenu />
      </nav>
      <main className="m-2 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
