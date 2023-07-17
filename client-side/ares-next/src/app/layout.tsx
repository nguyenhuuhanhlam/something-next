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
	const menuItems = [
		{id:1,text:'BTX-HELPERS',href:'/btx-helpers'},
		{id:2,text:'WORLD'},
		{id:3,text:'IM'},
		{id:4,text:'HERE'}
	]
	
	return (
		<html lang="en">
			<body className={barlow.className}>
				<section>
					<Nav height={48} items={menuItems}/>
				</section>
				{children}
			</body>
		</html>
	)
}