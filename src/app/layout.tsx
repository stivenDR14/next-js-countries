import "./globals.css";
import React from "react";
import { Nunito_Sans } from "next/font/google";
import { ThemeClientProvider } from "../components/theme-client-provider";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
});

export const metadata = {
  title: "Where in the world? - Next.js App",
  description: "Country Next.js App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <ThemeClientProvider>{children}</ThemeClientProvider>
      </body>
    </html>
  );
}
