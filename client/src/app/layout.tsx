import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthSessionProvider from '@/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StoreFlow',
  description: 'O melhor sistema para criar e gerenciar seu negócio online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body className={inter.className}>{children}</body>
      </NextAuthSessionProvider>
    </html>
  )
}
