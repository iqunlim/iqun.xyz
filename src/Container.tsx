import { Outlet } from "react-router-dom";

export default function ContainerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-2 h-20 flex items-center pl-5">
        IQ's Random Components
      </header>
      <div className="flex flex-1 flex-col sm:flex-row">
        <nav className="order-first w-full sm:w-32 p-4 border-2 flex flex-row sm:flex-col gap-2">
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
        </nav>
        <main className="mx-2 flex-1 flex justify-center items-center">
          <Outlet />
        </main>
      </div>
      <footer className="text-right p-1 border-2">(C) Me!</footer>
    </div>
  );
}
