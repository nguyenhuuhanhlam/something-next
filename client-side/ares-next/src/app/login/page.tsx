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

	const [username,setUsername] = useState()
	const [password,setPassword] = useState()

	const loginHandle = () => {
		dispatch({ type:'LOGIN', payload:"HELLO LOGII" })
	}

	return (
		<>
			<BlankSpace space={32} vh={1}/>
			<Subtitle2>Signin</Subtitle2>
			<BlankSpace space={24} vh={1}/>

			<div className={styles.root}>
				<Field label="Username">
					<TextBox />
				</Field>
				<Field label="Password">
					<TextBox type="password"/>
				</Field>
				<BlankSpace space={24} vh={1}/>
				<Button
					style={{ maxWidth:'80px' }} shape="square" appearance="primary"
					onClick={ loginHandle }
				>LOGIN</Button>
			</div>
		</>
	)
}