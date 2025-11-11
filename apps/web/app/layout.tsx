import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "PrintSaaS",
  description: "Hybrid B2B + B2C Printing SaaS Platform"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
