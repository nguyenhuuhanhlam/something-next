'use client'

import { StrictMode } from 'react'
import { registerLicense } from '@syncfusion/ej2-base'
import { AppBarComponent } from '@syncfusion/ej2-react-navigations'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'

import '@/../node_modules/@syncfusion/ej2/material.css'

import './globals.css'

// import type { Metadata } from 'next'
// import { Barlow } from 'next/font/google'

// import { FluentProvider, teamsLightTheme } from '@fluentui/react-components'

// import { AppContextProvider } from '@/contexts/app.context.tsx'
// import { Nav } from '../components/Nav'

// const barlow = Barlow({ subsets: ['vietnamese'], weight: '400' })

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZjUX9fcXZRQGRcUUN/Wg==')

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const menuItems = [
		{ id:1, text:'BITRIX', href:'/btx-helpers' },
		{ id:2, text:'KIOT', href:'/kiot-helpers' },
		{ id:3, text:'ABOUT', href:'/' }
	]
	
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
					<section>
					
                        <AppBarComponent colorMode="Light">
                            <ButtonComponent aria-label='menu' cssClass='e-inherit menu' iconCss='e-icons e-menu'></ButtonComponent>
                            <span className="regular">LAB.X</span>
                            <div className="e-appbar-spacer"></div>
                            <ButtonComponent cssClass='e-inherit login'>LOGIN</ButtonComponent>
                        </AppBarComponent>
                    
					</section>
					<section style={{ marginLeft:'32px', marginTop:'32px', marginRight:'32px' }}>{ children }</section>
				</StrictMode>
			</body>
		</html>
	)
}