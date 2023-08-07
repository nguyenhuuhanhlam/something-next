import { useContext } from 'react'
import { AppBarComponent } from '@syncfusion/ej2-react-navigations'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'

import { Avatar } from '@/components/Avatar'
import { AppContext } from '@/contexts/app.context'
import { LETTER_COLORS } from '@/constants'

interface LinkItem {
	id: number,
	type: string,
	href: string
}

interface NavProps {
	// height: number,
	items: { id:number, text:string, href:string }[],
	onItemClick: (link:LinkItem)=>void 
}

export const AppBar = (props:NavProps) => {

	const { state: {loggedInUser} } = useContext(AppContext)

	const handleItemClick = (link) => {
		if (props.onItemClick)
			props.onItemClick(link)
	}

	return (
		<AppBarComponent colorMode="Dark">
			<ButtonComponent aria-label='menu' cssClass='e-inherit menu' iconCss='e-icons e-menu'></ButtonComponent>
			
			{
				props.items.map((v,k)=>
					<ButtonComponent
						cssClass="e-inherit"
						key={ k }
						onClick={ ()=>handleItemClick({ type:'link', href:v.href }) }
					>{ v.text }</ButtonComponent>
				)
			}

			<div className="e-appbar-spacer"></div>
			<div className="e-appbar-separator"></div>

			{
				loggedInUser?.jwt
				? 	<Avatar
						item={ loggedInUser.username }
						palette={ LETTER_COLORS }
						itemOnClick={ ()=>handleItemClick({type:'link',href:'/personal-info'}) }
					/>
				: 	<ButtonComponent onClick={ ()=>handleItemClick({type:'link',href:'/login'}) } cssClass="e-inherit">Login</ButtonComponent>
			}
			
		</AppBarComponent>
	)
}
