'use client'

import { Link, Image } from '@fluentui/react-components'

interface NavProps {
	height: number
}

export const Nav = (props:NavProps) => {
	return (
		<div style={{ height:props.height + 'px' }}>
			<div style={{width:'80px'}}><Image src="/vercel.svg" /></div>
			<Link href="/">HOME</Link>
			<Link href="/btx-helpers">BTX HELPERS</Link>
		</div>
	)
}