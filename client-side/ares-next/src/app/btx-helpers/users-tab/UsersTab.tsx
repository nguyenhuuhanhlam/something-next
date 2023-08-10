import {
	useEffect,
	useState,
	useContext } from 'react'
import axios from 'axios' 

import {
	GridComponent,
	ColumnsDirective,
	ColumnDirective,
	Inject,
	Page,
	Toolbar } from '@syncfusion/ej2-react-grids'
import { Browser } from '@syncfusion/ej2-base'

import { BTXContext } from '@/contexts/btx.context'

import './users.tab.css'

export default function UsersTab () {

	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	const [ data,setData ] = useState(null)
	const [ isDevice,setIsDevice ] = useState(Browser.isDevice)
	const { state } = useContext(BTXContext)

	let grid

	useEffect(()=>{

		const fetchData = async () => {
			let all = []
			const filter = { ACTIVE:true }

			const res = await axios.post(`${ BITRIX_ENDPOINT }/user.get`, { filter })
			const { data:{total}, data:{next}, data:{result} } = res

			all = all.concat(result)

			const page_size = 50
			if (next) {
				for (let i=1; i<=Math.floor(total/page_size); i++) {
					const res = await axios.post(`${ BITRIX_ENDPOINT }/user.get`,{ filter, start: i*page_size })
					const { data:{result} } = res

					all = all.concat(result)
				}
			}

			setData({
				result: all.map(v=>{
					v['UF_DEPARTMENT'] = v['UF_DEPARTMENT'].map(v=>
						state.departmentList.find(x=>x['ID']===v.toString())['NAME']
					).join('::')
					return v
				})
			})
		}

		fetchData() // <---|

	},[])

	const departmentTmp = (props) => {
		return (
			<div className="dps">
			{
				props['UF_DEPARTMENT'].split('::').map((v,k)=>{
					return ( 
						<span
							key={k}
							className="dp-item"
							onClick={()=>{
								if (grid)
									grid.search(v)
							}}
						>{ v }</span>
					)
				})
			}
			</div>
		)
	}

	const UsersGrid = (props) => (
		<GridComponent
			dataSource={data?.result}
			allowPaging={true}
			pageSettings={{ pageCount:4, pageSizes:true, pageSize: 20 }}
			height={props.height}
			toolbar={['Search']}
			enableAdaptiveUI={props.enableAdaptiveUI}
			rowRenderingMode={props.rowRenderingMode}
			ref={ g => grid = g }
			>
			<ColumnsDirective>
				<ColumnDirective field="LAST_NAME" headerText="Last Name" width={160} />
				<ColumnDirective field="NAME" headerText="Name" width={96} />
				<ColumnDirective field="EMAIL" headerText="E-Mail" width={280} />
				<ColumnDirective field="UF_DEPARTMENT" headerText="Departments" template={departmentTmp} />
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