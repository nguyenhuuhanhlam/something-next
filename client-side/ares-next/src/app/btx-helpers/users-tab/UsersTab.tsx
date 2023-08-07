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

export default function UsersTab () {

	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	const [ data,setData ] = useState(null)
	const [ isDevice,setIsDevice ] = useState(Browser.isDevice)

	useEffect(()=>{

		const fetchData = async () => {
			let all = []
			const res = await axios.post(`${ BITRIX_ENDPOINT }/user.get`)
			const { data:{total}, data:{next}, data:{result} } = res

			all = all.concat(result)

			const page_size = 50
			if (next) {
				for (let i=1; i<=Math.floor(total/page_size); i++) {
					const res = await axios.post(`${ BITRIX_ENDPOINT }/user.get`,{ start: i*page_size })
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
				<ColumnDirective field="LAST_NAME" headerText="Last Name" width={160} />
				<ColumnDirective field="NAME" headerText="Name" width={96} />
				<ColumnDirective field="EMAIL" headerText="E-Mail" width={240} />
				<ColumnDirective field="UF_DEPARTMENT" headerText="Departments" />
			</ColumnsDirective>
			<Inject services={[ Toolbar,Page ]}/>
		</GridComponent>
	)

	return (
		<div style={{ marginTop: 16 +'px' }}>
			{
				isDevice
				? 	<div className="e-bigger">
						<UsersGrid
							enableAdaptiveUI={true}
							rowRenderingMode={'Vertical'}
							height={'100%'} />
					</div>
				: <UsersGrid height={440} />
			}
		</div>
	)
}