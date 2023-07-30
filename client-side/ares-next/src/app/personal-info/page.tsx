'use client'

import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context.tsx'

export default function PersonalInfoPage() {
	
	const { state } = useContext(AppContext)

	if (state?.loggedInUser?.jwt)
		return <h1>Hello, loggedInUser!</h1>
	else
		return <h1>You Need To Login First!</h1>
}