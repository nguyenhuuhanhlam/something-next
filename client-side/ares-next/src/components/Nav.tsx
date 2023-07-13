'use client'

import { Link, Image } from '@fluentui/react-components'
import { BlankSpace } from './BlankSpace.tsx'

interface NavProps {
	height: number,
	items: { id:number, text:string, href:string }[]
}

export const Nav = (props:NavProps) => {
	
	const styles = {
		height:props.height + 'px',
		paddingLeft:props.height / 2 + 'px',
		background:'#CFD8DC',
		display:'flex',
		flexWrap:'nowrap',
		alignItems:'center'
	}

	return (
		<div style={styles}>

			<div style={{
				width:'80px',
				paddingRight: props.height / 2 + 'px'
			}}>
				<Image src="/vercel.svg"/>
			</div>

			<>
			{
				props.items.map((v,k)=><span key={v.id}>{v.text}</span>)
			}
			</>

			<Link href="/">HOME</Link>
			<BlankSpace width={16}/>
			<Link href="/btx-helpers">BTX HELPERS</Link>
		</div>
	)
}