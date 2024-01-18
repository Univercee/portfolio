import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from "@/components/header"
import Footer from '@/components/footer'

const poppins = Poppins({subsets: ['latin'], weight: ['400']})

export const metadata: Metadata = {
  title: 'Main',
  description: 'Aleksandr Ostromogilskii portfolio page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
