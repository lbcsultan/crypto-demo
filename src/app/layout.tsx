import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Demo',
  description: 'Node-forge crypto package',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-screen mx-auto">
          <Navbar />
          <div className="max-w-4xl mx-auto mt-4">{children}</div>
        </div>
      </body>
    </html>
  )
}
