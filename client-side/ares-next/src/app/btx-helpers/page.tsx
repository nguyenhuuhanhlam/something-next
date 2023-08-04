'use client'

import {
	TabComponent,
	TabItemDirective,
	TabItemsDirective
} from '@syncfusion/ej2-react-navigations'

import UsersTab from './users-tab/UsersTab.tsx'
import './btx.helpers.css'

export default function Page() {
	return (
		<>
			<h4>Bitrix Helpers</h4>
			
			<TabComponent heightAdjustMode="Auto">
				<TabItemsDirective>
					<TabItemDirective header={{text:'INTRO'}} />
					<TabItemDirective header={{text:'USERS'}} content={()=><UsersTab/>} />
				</TabItemsDirective>
			</TabComponent>
		</>
	)
}