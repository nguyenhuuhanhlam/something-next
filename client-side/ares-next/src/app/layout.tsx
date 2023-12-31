'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { registerLicense } from '@syncfusion/ej2-base'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations'

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZjUX9fcXZRQGRcUUN/Wg==')

import { AppContextProvider } from '@/contexts/app.context'
import { AppBar } from '../components/AppBar'
import { SideBar } from '../components/SideBar'

import { sidemenuData } from '@/contexts/store'

import '@/../node_modules/@syncfusion/ej2-base/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-layouts/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-navigations/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-buttons/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-react-grids/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-inputs/styles/material.css'
import '@/../node_modules/@syncfusion/ej2-dropdowns/styles/material.css'
import './globals.css'

export default function RootLayout({children}) {
	
	const router = useRouter()
	let sidebar = useRef<SidebarComponent>(null)
	const menuItems = []

	const handleMenuClick = () => sidebar.current.toggle()
	const handleItemClick = (link) => router.replace(link.href)

	const handleSideItemSelected = (e) => {

		const { nodeData:{id} } = e
		
		switch (id) {
			case 'home':
					router.replace('/')
				break		

			case 'btx-users':
					router.replace('/btx-helpers/users')
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
					
					<div className="main_body">
						<div className="main_content">
						{ children }
						</div>
					</div>
					
					<SideBar
						_ref={ sidebar }
						target=".main_body"
						items={ sidemenuData }
						itemOnSelected={ handleSideItemSelected }
					/>
				</AppContextProvider>
			</body>
		</html>
	)
}