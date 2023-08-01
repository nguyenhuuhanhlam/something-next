'use client'

import { useContext } from 'react'
import Link from 'next/link'

import {
	Avatar,
	Image
} from '@fluentui/react-components'
import { AppContext } from '@/contexts/app.context.tsx'
import { BlankSpace } from './BlankSpace.tsx'

interface NavProps {
	height: number,
	items: { id:number, text:string, href:string }[],
}

export const Nav = (props:NavProps) => {

	const { state:{loggedInUser} } = useContext(AppContext)
	
	const styles = {
		height: props.height + 'px',
		paddingLeft: props.height / 2 + 'px',
		paddingRight: props.height / 2 + 'px',
		background: '#CFD8DC',
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center'
	}

	const item_styles = {
		height:'inherit',
		display:'inherit',
		alignItems: 'center'
	}

	return (
		<ul style={styles}>
			
			{/* LOGO */}
			
			<li style={{ paddingRight:'32px' }}>
				<Link href="/">
					<div style={{ width:'32px' }}><Image src="/lab.x.svg"/></div>
				</Link>
			</li>
			
			{/* LINK ITEM */}

			{
				props.items.map((v,k,{length})=>{
					if (k+1===length) {
						return <li key={v.id} style={item_styles}><Link href={ v.href || '#' }>{v.text}</Link></li>
					}
					else
						return <li key={v.id} style={{ ...item_styles, marginRight:'8px' }}><Link href={ v.href || '#' }>{v.text}</Link></li>
				})
			}

			{/* LAST ITEM */}

			<li style={{ marginLeft:'auto' }}>
			{
				loggedInUser?.jwt
				? 	<>
						<Avatar color="brand" initials={loggedInUser.username.substring(0,2).toUpperCase()} style={{ marginRight:'8px' }}/>
						<Link href="/personal-info">{loggedInUser.username}</Link>
					</>
				: 	<Link href="/login">LOGIN</Link>
			}
			</li>
		</ul>
	)
}