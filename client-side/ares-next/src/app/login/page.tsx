'use client'

import { AppContext } from '@/contexts/app.context.tsx'
import { useContext } from 'react'

export default function Page() {
	const { state, dispatch } = useContext(AppContext)

	return (
		<>
			<h1>Hello, Login page!</h1>
			<button onClick={() => dispatch({type:'C1'})}>COUNTER</button>
		</>
	)
}