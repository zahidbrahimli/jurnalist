import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ön Yoxlama Platforması",
  description:
    "Yanlış xəbərlər dərc olunmadan əvvəl dayansın — jurnalistlər üçün sürətli yoxlama, menecerlər üçün şəffaf təsdiq paneli.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8 w-full flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
