'use client'

import { useRouter } from 'next/navigation'
import { registerLicense } from '@syncfusion/ej2-base'

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
	const menuItems = [
		{ id:1, text:'BITRIX', href:'/btx-helpers' },
		{ id:2, text:'KIOT', href:'/kiot-helpers' }
	]

	const handleMenuClick = () => {
		console.log('mo menu side')
	}
	const handleItemClick = (link) => router.replace(link.href)

	
	return (
		<html lang="en">
			<body>
				<AppContextProvider>
					<section><AppBar items={ menuItems } onItemClick={ handleItemClick } onMenuClick={ handleMenuClick } /></section>
					<section className="main-section">{ children }</section>
					<SideBar target=".main-section"/>
				</AppContextProvider>
			</body>
		</html>
	)
}