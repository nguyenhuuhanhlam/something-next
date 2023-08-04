'use client'

import { useRouter } from 'next/navigation'
import { registerLicense } from '@syncfusion/ej2-base'

import { AppContextProvider } from '@/contexts/app.context.tsx'
import { AppBar } from '../components/AppBar'

import '@/../node_modules/@syncfusion/ej2/material.css'
import './globals.css'

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZjUX9fcXZRQGRcUUN/Wg==')

export default function RootLayout({children}:{children:React.ReactNode}) {
	
	const router = useRouter()
	const menuItems = [
		{ id:1, text:'BITRIX', href:'/btx-helpers' },
		{ id:2, text:'KIOT', href:'/kiot-helpers' }
	]

	const handleItemClick = (link) => router.replace(link.href)
	
	return (
		<html lang="en">
			<body>
				<AppContextProvider>
					<section><AppBar items={ menuItems } onItemClick={ handleItemClick } /></section>
					<section className="main-section">{ children }</section>
				</AppContextProvider>
			</body>
		</html>
	)
}