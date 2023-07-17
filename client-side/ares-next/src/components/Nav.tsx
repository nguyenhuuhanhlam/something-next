'use client'

import { Link, Image } from '@fluentui/react-components'
import { BlankSpace } from './BlankSpace.tsx'

interface NavProps {
	height: number,
	items: { id:number, text:string, href:string }[]
}

export const Nav = (props:NavProps) => {
	
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
			<li style={{paddingRight: '32px'}}>
				<div style={{width: '80px'}}><Image src="/vercel.svg"/></div>				
			</li>
			
			{
				props.items.map((v,k,{len})=>{
					if (k+1===len) 
						return <li key={v.id}><Link href={v.href}>{v.text}</Link></li>
					else
						return <li key={v.id} style={{ paddingRight:'8px' }}><Link href={v.href}>{v.text}</Link></li>
				})
			}			
		</ul>
	)
}