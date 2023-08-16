'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { registerLicense } from '@syncfusion/ej2-base'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations'

import { AppContextProvider } from '@/contexts/app.context'
import { AppBar } from '../components/AppBar'
import { SideBar } from '../components/SideBar'

import '@/../node_modules/@syncfusion/ej2-base/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-navigations/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-buttons/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-react-grids/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-inputs/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-dropdowns/styles/material.css'

import './globals.css'

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZjUX9fcXZRQGRcUUN/Wg==')

export default function RootLayout({children}:{children:React.ReactNode}) {
	
	const router = useRouter()
	let sidebar = useRef<SidebarComponent>(null)
	const menuItems = []

	const handleMenuClick = () => {
		sidebar.current.toggle()
	}
	const handleItemClick = (link) => router.replace(link.href)

	const handleSideItemSelected = (e) => {
		const { nodeData:{id} } = e
		
		switch (id) {
			case 'home':
				router.replace('/')
			break

		case 'applinks-':
				router.replace('/')
			break

			case 'btx-users':
				router.replace('/btx-helpers')
			break
		}
	}


	
	return (
		<html lang="en">
			<body>
				<AppContextProvider>
					<AppBar
						items={ menuItems }
						onMenuClick={ handleMenuClick }
						onItemClick={ handleItemClick }
						/>
					
					<div className="main_section">
						<div className="main_contain pt-5 px-5">
						{ children }
						</div>
					</div>
					
					<SideBar
						_ref={ sidebar }
						target=".main_section"
						itemOnSelected={ handleSideItemSelected }
					/>
				</AppContextProvider>
			</body>
		</html>
	)
}