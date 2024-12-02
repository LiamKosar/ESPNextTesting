import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css";
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A simple dashboard with tabs",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100 overscroll-none">
          {children}
        </div>
      </body>
  )
}