import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "IQ's React Stuff",
  description: "iqun.xyz",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // As per https://ui.shadcn.com/docs/dark-mode/next suppressing this warning is fine?
    // Surely, this won't bite me in the butt at some point
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <ClerkProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="pointer-events-auto fixed top-5 right-5 z-10 h-fit w-fit">
                <ModeToggle />
              </div>
              {children}
            </ThemeProvider>
          </Suspense>
        </ClerkProvider>
      </body>
    </html>
  );
}
