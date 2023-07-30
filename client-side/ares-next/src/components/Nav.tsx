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

	const { state } = useContext(AppContext)
	
	const styles = {
		height: props.height + 'px',
		paddingLeft: props.height / 2 + 'px',
		paddingRight: props.height / 2 + 'px',
		background: '#CFD8DC',
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center'
	}

	return (
		<ul style={styles}>
			
			{/* LOGO */}
			
			<li style={{ paddingRight:'32px' }}>
				<div style={{ width:'32px' }}><Image src="/lab.x.svg"/></div>				
			</li>
			
			{/* MENU ITEMS */}

			{
				props.items.map((v,k,{len})=>{
					if (k+1===len) 
						return <li key={v.id}><Link href={ v.href || '#' }>{v.text}</Link></li>
					else
						return <li key={v.id} style={{ marginRight:'8px' }}><Link href={ v.href || '#' }>{v.text}</Link></li>
				})
			}

			{/* LOG ITEM */}

			<li style={{ marginLeft:'auto' }}>
			{
				state?.loggedInUser?.jwt
				? <><Avatar color="brand"/> <Link href="/personal-info">{state.loggedInUser.username}</Link></>
				: <Link href="/login">LOGIN</Link>
			}
			</li>
		</ul>
	)
}