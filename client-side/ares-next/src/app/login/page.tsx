'use client'

import {
	makeStyles,
	shorthands,
	Button,
	Field,
	Input,
	Label,
	Subtitle2,SpacingVerticalXXXL
} from '@fluentui/react-components'

import { AppContext } from '@/contexts/app.context.tsx'
import { BlankSpace } from '@/components/BlankSpace.tsx'
import { useContext } from 'react'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '320px',
		...shorthands.gap('4px')
	}
})

export default function Page() {
	const { state, dispatch } = useContext(AppContext)
	const styles = useStyles()

	return (
		<>
			<BlankSpace space={32} vh={1}/>
			<Subtitle2>Signin</Subtitle2>
			<BlankSpace space={24} vh={1}/>

			<div className={styles.root}>
				<Field label="Username">
					<Input />
				</Field>
				<Field label="Password">
					<Input />
				</Field>
				<Button style={{maxWidth:'80px',marginTop:'16px'}} shape="square" appearance="primary" onClick={() => dispatch({type:'C1'})}>LOGIN</Button>
			</div>
		</>
	)
}