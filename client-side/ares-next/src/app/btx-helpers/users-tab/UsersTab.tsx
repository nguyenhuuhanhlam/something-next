import { useEffect, useState } from 'react'
import axios from 'axios' 

import {
	GridComponent,
	ColumnsDirective,
	ColumnDirective,
	Inject,
	Page,
	Toolbar } from '@syncfusion/ej2-react-grids'
import { Browser } from '@syncfusion/ej2-base';

import { BITRIX_ENDPOINT } from '@/contexts/store.tsx' 


export default function UsersTab () {

	const [ data,setData ] = useState(null)
	const [ isDevice,setIsDevice ] = useState(Browser.isDevice)

	useEffect(()=>{

		const fetchData = async () => {
			let all = []
			const res = await axios.post(`${ BITRIX_ENDPOINT[11] }/user.get`)
			const { data:{total}, data:{next}, data:{result} } = res

			all = all.concat(result)

			const page_size = 50
			if (next) {
				for (let i=1; i<=Math.floor(total/page_size); i++) {
					const res = await axios.post(`${ BITRIX_ENDPOINT[11] }/user.get`,{ start: i*page_size })
					const { data:{result} } = res

					all = all.concat(result)
				}
			}
			setData({ result:all })
		}

		fetchData() // <---|

	},[])


	const UsersGrid = (props) => (
		<GridComponent
			dataSource={data?.result}
			allowPaging={true}
			pageSettings={{ pageCount:4, pageSizes:true, pageSize: 20 }}
			height={props.height}
			toolbar={['Search']}
			enableAdaptiveUI={props.enableAdaptiveUI}
			rowRenderingMode={props.rowRenderingMode}
			>
			<ColumnsDirective>
				<ColumnDirective field="LAST_NAME" headerText="Last Name" />
				<ColumnDirective field="NAME" headerText="Name" />
				<ColumnDirective field="EMAIL" headerText="E-Mail" />
				<ColumnDirective field="UF_DEPARTMENT" headerText="Departments" />
			</ColumnsDirective>
			<Inject services={[ Toolbar,Page ]}/>
		</GridComponent>
	)

	return (
		<div style={{ marginTop: 16 +'px' }}>
			{
				isDevice
				? <UsersGrid enableAdaptiveUI={true} rowRenderingMode={'Vertical'} height={'100%'} />
				: <UsersGrid enableAdaptiveUI={true} height={440} />
			}
		</div>
	)
}