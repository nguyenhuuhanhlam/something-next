'use client'

import {
	useEffect,
	useState,
	useContext } from 'react'
import {
	TabComponent,
	TabItemDirective,
	TabItemsDirective } from '@syncfusion/ej2-react-navigations'

import { BTXContext } from '@/contexts/btx.context'
import UsersTab from './users-tab/UsersTab'
import './btx.helpers.css'

export default function Page() {
	
	const { state,dispatch } = useContext(BTXContext)

	useEffect(()=>{},[])

	return (
		<>
			<h4>Bitrix Helpers</h4>
			
			<TabComponent heightAdjustMode="Auto">
				<TabItemsDirective>
					<TabItemDirective header={{ text:'INTRO' }} />
					<TabItemDirective header={{ text:'USERS' }} content={ UsersTab } />
				</TabItemsDirective>
			</TabComponent>
		</>
	)
}