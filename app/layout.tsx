import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "./asset/logo";
import HamburgerIcon from "./asset/hamburger-icon";
import SearchIcon from "./asset/search-icon";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ASKIT",
    default: "ASKIT",
  },
  description: "디자인과 개발 관련 모든 궁금증을 ASKIT에서 해결하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between h-screen max-w-screen-sm mx-auto`}
      >
        <header className="flex justify-between items-center py-4 border-b border-gray-200 px-10">
          <Logo />
          <div className="flex gap-4">
            <SearchIcon />
            <HamburgerIcon />
          </div>
        </header>
        <main className="h-full px-10">{children}</main>
        <footer className="flex justify-between items-center bg-gray-100 py-4 border-t border-gray-200 px-10">
          <p>&copy; AskIT, Inc.</p>
          <div className="flex gap-4">
            <p>이용약관</p>
            <p>개인정보처리방침</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
