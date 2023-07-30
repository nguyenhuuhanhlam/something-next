'use client'

import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import axios from 'axios'

import {
	makeStyles,
	shorthands,
	Button,
	Field,
	Input,
	InputProps,
	Label,
	Subtitle2,
	Caption2
} from '@fluentui/react-components'

import { ErrorCircle20Regular } from '@fluentui/react-icons'

import { STRAPI_ENDPOINT } from '@/contexts/store.tsx'
import { AppContext } from '@/contexts/app.context.tsx'
import { BlankSpace } from '@/components/BlankSpace.tsx'

/* - - - - - */

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '320px',
		...shorthands.gap('4px'),
	}
})

const TextBox = (props:InputProps) => <Input {...props} style={{ borderRadius:'unset' }} />

/* - - - - - */

export default function Page() {
	const { state,dispatch } = useContext(AppContext)
	const router = useRouter()
	const styles = useStyles()

	const [ loginData,setLoginData ] = useState({
		identifier: '',
		password: '',
	})
	const [ ux,setUx ] = useState({
		pending: false,
		showErrMsg:false
	})

	// 1.

	const handleChange = (e) => {
		const { name,value } = e.target
		setLoginData({ ...loginData,[name]:value })
		setUx({ ...ux,showErrMsg:false })
	}

	const submitHandle = async (e) => {
		const { identifier,password } = loginData
		try {
			setUx({ ...ux,pending:true })
			const auth = await axios.post(`${ STRAPI_ENDPOINT }/api/auth/local`, { identifier, password })
			dispatch({ type:'LOGIN', payload:auth.data })
			router.replace('/personal-info')
		} catch (e) {
			setUx({ ...ux, showErrMsg:true, pending:false })
		}
	}

	// E.

	return (
		<>
			<div style={{ display:'flex',alignItems:'center' }}>
				<Subtitle2>Signin</Subtitle2>
				{ ux.showErrMsg
					? <Caption2 style={{ paddingLeft:'32px', color:'DarkRed' }}>
						<ErrorCircle20Regular color="DarkRed"/> Invalid identifier or password.</Caption2>
					: null
				}
			</div>
			<BlankSpace space={24} vh={1}/>

			<div className={styles.root}>
				<Field label="Username">
					<TextBox name="identifier" onChange={ handleChange } />
				</Field>
				<Field label="Password">
					<TextBox name="password" type="password" onChange={ handleChange } />
				</Field>
				<BlankSpace space={24} vh={1}/>
				<Button
					style={{ maxWidth:'80px' }} shape="square" appearance="primary"
					onClick={ submitHandle }
					disabled={ ux.pending }
				>LOGIN</Button>
			</div>
		</>
	)
}