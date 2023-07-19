'use client'

import './globals.css'

import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'

import { FluentProvider, teamsLightTheme } from '@fluentui/react-components'

import { AppContextProvider } from '@/contexts/app.context.tsx'
import { Nav } from '../components/Nav'

const barlow = Barlow({ subsets: ['vietnamese'], weight: '400' })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const menuItems = [
		{ id:1, text:'BTX-HELPERS', href:'/btx-helpers' },
		{ id:5, text:'LOGIN', href:'/login' }
	]
	
	return (
		<html lang="en">
			<body className={barlow.className}>
				<AppContextProvider>
					<FluentProvider theme={teamsLightTheme}>
						<section>
							<Nav height={48} items={menuItems}/>
						</section>
						<section style={{paddingLeft:'136px'}}>{ children }</section>
					</FluentProvider>
				</AppContextProvider>
			</body>
		</html>
	)
}