'use client'

import { AppBarComponent } from '@syncfusion/ej2-react-navigations'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'


interface LinkItem {
	type: string,
	href: string
}
interface NavProps {
	height: number,
	items: { id:number, text:string, href:string }[],
	onItemClick: (link:LinkItem)=>void 
}

export const AppBar = (props:NavProps) => {

	const handleItemClick = (link) => {
		if (props.onItemClick)
			props.onItemClick(link)
	}

	return (
		<AppBarComponent colorMode="Light">
			<ButtonComponent aria-label='menu' cssClass='e-inherit menu' iconCss='e-icons e-menu'></ButtonComponent>
			
			{
				props.items.map((v,k)=>
					<ButtonComponent
						cssClass="e-inherit"
						key={ k }
						onClick={ ()=>handleItemClick({type:'link',href:v.href}) }
					>{ v.text }</ButtonComponent>
				)
			}

			<div className="e-appbar-spacer"></div>
        	<div className="e-appbar-separator"></div>
        	<ButtonComponent onClick={ ()=>handleItemClick({type:'link',href:'/login'}) } cssClass="e-inherit">Login</ButtonComponent>
		</AppBarComponent>
	)
}