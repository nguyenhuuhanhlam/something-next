'use client'

import {
	makeStyles,
	shorthands,
	Button,
	Field,
	Input,
	InputProps,
	Label,
	Subtitle2
} from '@fluentui/react-components'

import { AppContext } from '@/contexts/app.context.tsx'
import { BlankSpace } from '@/components/BlankSpace.tsx'
import { useContext, useState } from 'react'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '320px',
		...shorthands.gap('4px'),
		
	}
})

const TextBox = (props:InputProps) => <Input {...props} style={{ borderRadius: 'unset' }} />

export default function Page() {
	const { state, dispatch } = useContext(AppContext)
	const styles = useStyles()

	const [loginData, setLoginData] = useState({
		identifier: '',
		password: '',
	})

	// 1.

	const handleChange = (e) => {
		const { name, value } = e.target
		setLoginData({...loginData, [name]: value })
	}

	const submitHandle = () => {
		dispatch({ type: 'LOGIN', payload: loginData })
	}

	//

	return (
		<>
			<BlankSpace space={32} vh={1}/>
			<Subtitle2>Signin</Subtitle2>
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
				>LOGIN</Button>
			</div>
		</>
	)
}