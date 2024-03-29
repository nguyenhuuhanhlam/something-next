'use client'

import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import axios from 'axios'
import NextCors from 'nextjs-cors'

import { AppContext } from '@/contexts/app.context'

import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { MessageComponent } from '@syncfusion/ej2-react-notifications'

/* - - - - - */

export default function LoginPage()
{
	const { state,dispatch } = useContext(AppContext)
	const router = useRouter()

	const [ loginData,setLoginData ] = useState({
		username: '',
		password: '',
	})

	const [ ux,setUx ] = useState({
		pending:false,
		showErrMsg:false
	})

	/* - - HANDLES - - */

	const handleChange = (e) => {
		const { name, value } = e.target
		setLoginData({ ...loginData, [name]:value })
		setUx({ ...ux, showErrMsg:false })
	}

	const submitHandle = async (e) => {
		const { username,password } = loginData

		try {
			// setUx({ ...ux,pending:true })

			const auth = await axios.post(`${ process.env.NEXT_PUBLIC_URL }/api/btx/oauth`, { username,password })

			// new Promise(async rev=>{
			// 	await dispatch({ type:'LOGIN', payload:auth.data })
			// 	rev(true)
			// }).then(()=>router.replace('/personal-info'))

		} catch (e) {
			setUx({ ...ux, showErrMsg:true, pending:false })
		}
	}

	/* - - RETURN - - */

	return (
		<div className="login mx-5 my-5">
			<h4 style={{ fontWeight:600 }}>Sign-In</h4>

			<div style={{ display: ux.showErrMsg||'none' }}>
				{ ux.showErrMsg
					? 	<MessageComponent
							content="Invalid identifier or password"
							severity="Error"
						/>
					: 	null
				}
			</div>
			
			<TextBoxComponent
				placeholder="Username"
				cssClass="e-float-input e-small"
				floatLabelType="Auto"
				name="username"
				onChange={ handleChange }
			/>

			<TextBoxComponent
				type="password"
				placeholder="Password"
				cssClass="e-float-input e-small"
				floatLabelType="Auto"
				name="password"
				onChange={ handleChange }
			/>

			<ButtonComponent
				cssClass="e-primary my-5"
				disabled={ ux.pending }
				onClick={ submitHandle }
			>Sign-in</ButtonComponent>
		</div>
	)
}