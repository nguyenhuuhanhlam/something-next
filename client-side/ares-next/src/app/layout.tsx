import './globals.css'
import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import { Nav } from '../components/Nav'

const barlow = Barlow({ subsets: ['vietnamese'], weight: '400' })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={barlow.className}>
				<section>
					<Nav height={40}/>
				</section>
				{children}
			</body>
		</html>
	)
}