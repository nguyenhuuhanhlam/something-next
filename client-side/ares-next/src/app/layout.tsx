'use client'

import { StrictMode } from 'react'

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
		{ id:1, text:'BITRIX', href:'/btx-helpers' },
		{ id:2, text:'KIOT', href:'/kiot-helpers' }, // href:'/kiot-helpers'
		
	]
	
	return (
		<html lang="en">
			<body className={barlow.className}>
				<StrictMode>
					<AppContextProvider>
						<FluentProvider theme={teamsLightTheme}>
							<section>
								<Nav height={48} items={menuItems}/>
							</section>
							<section style={{ marginLeft:'88px', marginTop:'32px' }}>{ children }</section>
						</FluentProvider>
					</AppContextProvider>
				</StrictMode>
			</body>
		</html>
	)
}