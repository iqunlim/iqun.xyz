import { Outlet } from "react-router-dom";
import { NavigationMenuDemo } from "./components/nav-content";

export default function ContainerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background flex h-20 items-center gap-2 border-2 px-1 sm:px-5">
        <h1 className="scroll-m-20 text-sm font-extrabold tracking-tight text-nowrap sm:text-2xl">
          IQ's Random Components
        </h1>
        <NavigationMenuDemo />
      </header>
      <div></div>
      <div className="flex flex-1 flex-col sm:flex-row">
        <main className="mx-2 flex flex-1 items-center justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
