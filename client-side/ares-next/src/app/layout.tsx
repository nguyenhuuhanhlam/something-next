import './globals.css'
import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'

const barlow = Barlow({ subsets: ['latin'], weight: '200' })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={barlow.className}>{children}</body>
		</html>
	)
}