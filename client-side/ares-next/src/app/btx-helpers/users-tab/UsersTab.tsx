import { useEffect, useState } from 'react'
import axios from 'axios' 

import {
	GridComponent,
	ColumnsDirective,
	ColumnDirective,
	Inject,
	Filter,
	IFilter,
	VirtualScroll,
	Sort,
	Page,
	Toolbar } from '@syncfusion/ej2-react-grids'

import { BITRIX_ENDPOINT } from '@/contexts/store.tsx' 

export default function UsersTab () {

	const [ data,setData ] = useState(null)

	const toolbarOptions: any = ['Search']

	useEffect(()=>{

		const fetchData = async () => {
			const all = []
			const res = await axios.post(`${ BITRIX_ENDPOINT[11] }/user.get`)
			const { data:{next}, data:{result} } = res

			if (next) {

			}

			//setData({next,result})
		}

		fetchData()

	},[])

	return (
		<div style={{ marginTop: 16 +'px' }}>
			<GridComponent
				dataSource={data?.result}
				allowPaging={true}
				pageSettings={{ pageCount:4, pageSizes:true }}
				height={440}
				toolbar={toolbarOptions}
				>
				<ColumnsDirective>
					<ColumnDirective field="LAST_NAME" headerText="Last Name" />
					<ColumnDirective field="NAME" headerText="Name" />
					<ColumnDirective field="EMAIL" headerText="E-Mail" />
					<ColumnDirective field="UF_DEPARTMENT" headerText="Departments" />
				</ColumnsDirective>
				<Inject services={[ Toolbar,Page ]}/>
			</GridComponent>
		</div>
	)
}