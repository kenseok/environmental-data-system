import type { Metadata } from "next";
import { Inter  } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "data care systems",
  description: 'Environmental Data Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}