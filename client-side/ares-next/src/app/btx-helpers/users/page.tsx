'use client'

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

import './users.css'

export default function UsersTab () {

	const [ data,setData ] = useState(null)
	const [ isDevice,setIsDevice ] = useState(Browser.isDevice)
	// const { state, dispatch } = useContext(BTXContext)

	let grid

	useEffect(()=>{

		const fetchData = async () => {

			const {data:{ departmentList }} = await axios.post('/api/btx.department.get')
			const {data:{ users }} = await axios.post('/api/btx.user.get')

			setData({
				result: users.map(v=>{
					v['UF_DEPARTMENT'] = v['UF_DEPARTMENT'].map(v=>
						departmentList.find(x=>x['ID']===v.toString())['NAME']
					).join('::')
					return v
				})
			})
		}

		fetchData() // <---|

	},[])

	const departmentTemplate = (props) => {
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
				<ColumnDirective field="UF_DEPARTMENT" headerText="Departments" template={departmentTemplate} />
			</ColumnsDirective>
			<Inject services={[ Toolbar,Page ]}/>
		</GridComponent>
	)

	return (
		<div className="p-5">
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