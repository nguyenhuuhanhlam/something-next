'use client'

import {
	useEffect,
	useState,
	useContext } from 'react'
import axios from 'axios'
import {
	TabComponent,
	TabItemDirective,
	TabItemsDirective } from '@syncfusion/ej2-react-navigations'

import { BTXContext } from '@/contexts/btx.context'
import UsersTab from './users-tab/UsersTab'
import './btx.helpers.css'

export default function Page() {
	
	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_13']
	const { state, dispatch } = useContext(BTXContext)

	useEffect(()=>{
		const fetchData = async () => {
			const res = await axios.post(`${ BITRIX_ENDPOINT }/department.get`)
			const { data:{total}, data:{result} } = res

			dispatch({ type:'DEPARTMENT_GET', payload:result })
		}

		fetchData()
	},[])

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