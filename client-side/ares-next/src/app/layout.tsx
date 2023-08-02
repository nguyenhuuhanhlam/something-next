'use client'

import { useRouter } from 'next/navigation'
import { StrictMode } from 'react'
import { registerLicense } from '@syncfusion/ej2-base'

import '@/../node_modules/@syncfusion/ej2/material.css'
import './globals.css'


import { AppContextProvider } from '@/contexts/app.context.tsx'
import { AppBar } from '../components/AppBar'

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZjUX9fcXZRQGRcUUN/Wg==')

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const menuItems = [
		{ id:11, text:'BITRIX', href:'/btx-helpers' },
		{ id:20, text:'KIOT', href:'/kiot-helpers' },
		{ id:32, text:'ABOUT', href:'/' }
	]

	const handleItemClick = (link) => router.replace(link.href)
	
	// return (
	// 	<html lang="en">
	// 		<body className={barlow.className}>
	// 			<StrictMode>
	// 				<AppContextProvider>
	// 					<FluentProvider theme={teamsLightTheme}>
	// 						<section>
	// 							<Nav height={48} items={menuItems}/>
	// 						</section>
	// 						<section style={{ marginLeft:'88px', marginTop:'32px' }}>{ children }</section>
	// 					</FluentProvider>
	// 				</AppContextProvider>
	// 			</StrictMode>
	// 		</body>
	// 	</html>
	// )

	return (
		<html lang="en">
			<body>
				<StrictMode>
					<AppContextProvider>
						<section><AppBar items={ menuItems } onItemClick={ handleItemClick } /></section>
						<section className="main-section">{ children }</section>
					</AppContextProvider>
				</StrictMode>
			</body>
		</html>
	)
}

/*

<AppBarComponent colorMode="Light">
                            <ButtonComponent aria-label='menu' cssClass='e-inherit menu' iconCss='e-icons e-menu'></ButtonComponent>
                            <span className="regular">LAB.X</span>
                            <div className="e-appbar-spacer"></div>
                            <ButtonComponent cssClass='e-inherit login'>LOGIN</ButtonComponent>
                        </AppBarComponent>
*/