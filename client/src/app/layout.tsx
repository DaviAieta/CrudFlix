/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from './components/nav/navbar'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CrudFlix'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="../assets/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <header className="container flex justify-between mb-8">
          <NavBar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
