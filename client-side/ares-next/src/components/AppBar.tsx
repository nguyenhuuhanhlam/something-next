'use client'

import Link from 'next/link'
import { AppBarComponent } from '@syncfusion/ej2-react-navigations'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'

export const AppBar = (props:NavProps) => {
	return (
		<AppBarComponent colorMode="Light">
			<ButtonComponent aria-label='menu' cssClass='e-inherit menu' iconCss='e-icons e-menu'></ButtonComponent>
			<div className="e-appbar-spacer"></div>
			<span className="regular">LOGIN</span>
			<span className="regular">LOGIN</span>
			<span className="regular">LOGIN</span>
		</AppBarComponent>
	)
}