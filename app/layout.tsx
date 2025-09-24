
import "./../styles/globals.css";
import React from "react";
export const metadata = { title: "TradesPro", description: "Licensed-pro Q&A" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-4xl p-4">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">TradesPro</h1>
              <p className="text-sm text-gray-600">Questions from anyone. Answers from verified licensed pros.</p>
            </div>
            <nav className="text-sm space-x-4">
              <a className="underline" href="/">Home</a>
              <a className="underline" href="/ask">Ask</a>
              <a className="underline" href="/verify">Verify</a>
              <a className="underline" href="/search">AI Search</a>
              <a className="underline" href="/admin">Admin</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
