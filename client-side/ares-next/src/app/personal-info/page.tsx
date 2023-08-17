'use client'

import { useContext } from 'react'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'

import { AppContext } from '@/contexts/app.context.tsx'

export default function PersonalInfoPage() {
	
	const { state, dispatch } = useContext(AppContext)

	const submitHandle = () => {
		dispatch({ type:'LOGOUT' })
	}

	if (state?.loggedInUser?.jwt)
		return (
			<div className="mx-5 my-5">
				<h1>Hello, loggedInUser!</h1>
				<ButtonComponent onClick={ submitHandle }>Logout</ButtonComponent>
			</div>
		)
	else
		return <h1 className="mx-5 my-5">You Need To Login First!</h1>
}