import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import AuthProvider from "./context/AuthProvider";
import { AgentProvider } from "./agent-provider";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stewardship app",
  description: "Stewardship building with DML",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <AgentProvider>{children}</AgentProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
