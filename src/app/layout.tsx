import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Forge Crypto Demo',
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
        <Providers>
          <div className="max-w-screen mx-auto">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
