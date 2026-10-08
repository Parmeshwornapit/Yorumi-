import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yorumi — Your little anime universe",
  description: "Discover stories, find your people, and make the night your own.",
  other: {
    
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

