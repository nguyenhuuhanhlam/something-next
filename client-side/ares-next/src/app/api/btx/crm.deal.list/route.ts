import {
	NextRequest,
	NextResponse } from 'next/server'

import { DEAL_UFS } from '@/constants'

/* - - - - - - - - - - */

export async function POST (req) {
	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	let all = []
	let options = {
		select: [
			'ID',
			'ASSIGNED_BY_ID',
			'CATEGORY_ID',
			'CLOSEDATE',
			'COMPANY_ID',
			'DATE_CREATE',
			'OPPORTUNITY',
			'SOURCE_ID',
			'STAGE_ID',
			'TITLE',
			DEAL_UFS.BusinessSectors,
			DEAL_UFS.DeliveryDate,
			DEAL_UFS.FollowReasons,
			DEAL_UFS.LostReasons,
			DEAL_UFS.Possible,
			DEAL_UFS.Province,
			DEAL_UFS.SalesObject,
			DEAL_UFS.TargetDate,
			],
			start: 0
		}
	
	const res = await fetch(
		`${ BITRIX_ENDPOINT }/crm.deal.list`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({ ...options })
		}
	)

	const { total, next, result } = await res.json()

	// 2

	all = all.concat(result)

	// 3

	const page_size = 50
	if (next) {
		for (let i=1; i<=Math.floor(total/page_size); i++) {
			const res = await fetch(
				`${ BITRIX_ENDPOINT }/crm.deal.list`,
				{
					method:'POST',
					headers: { 'Content-Type': 'application/json' },
					body:JSON.stringify({ ...options, start: i*page_size })
				}
			)

			const { result } = await res.json()

			all = all.concat(result)
		}
	}

	/* - - - - - - - - - - CSV EXPORT - - - - - - - - - - */
	
	const uf_res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.deal.userfield.list`,
		{ method:'POST', headers:{'Content-Type':'application/json'} }
	)

	const uf_json = await uf_res.json()
	const uf_list = uf_json.result
		.reduce((acc, {FIELD_NAME, LIST})=>{
			if (LIST)
				acc[FIELD_NAME]=LIST
			return acc
		},{})

	// const rebuild = {
	// 	Id: id,
	// 	Title: result.TITLE,
	// 	Category: Number(result.CATEGORY_ID),
	// 	Stage: result.STAGE_ID,
	// 	CloseDate: result.CLOSEDATE?.slice(0,10) || null,
	// 	CreateDate: result.DATE_CREATE?.slice(0,10) || null,
	// 	Source: result.SOURCE_ID,
	// 	Amount: parseFloat(result.OPPORTUNITY),
	// 	Possible: Number(result[DEAL_UFS['Possible']]),
	// 	SalesObject: ufList[DEAL_UFS['SalesObject']].find(o=>o.ID==result[DEAL_UFS['SalesObject']])?.VALUE,
	// 	BusinessSectors: ufList[DEAL_UFS['BusinessSectors']].find(o=>o.ID==result[DEAL_UFS['BusinessSectors']])?.VALUE,
	// 	TargetDate: result[DEAL_UFS['TargetDate']]?.slice(0,10) || null,
	// 	Province: ufList[DEAL_UFS['Province']].find(o=>o.ID==result[DEAL_UFS['Province']])?.VALUE,
	// 	LostReasons: ufList[DEAL_UFS['LostReasons']].find(o=>o.ID==result[DEAL_UFS['LostReasons']])?.VALUE,
	// 	DeliveryDate: result[DEAL_UFS['DeliveryDate']]?.slice(0,10) || null,
	// 	Responsible: Number(result.ASSIGNED_BY_ID),
	// 	FollowReasons: ufList[DEAL_UFS['FollowReasons']].find(o=>o.ID==result[DEAL_UFS['FollowReasons']])?.VALUE,
	// 	Company: Number(result.COMPANY_ID)
	// }


	let sql_values = []
	all.map(v => {

		const rebuild ={
			CLOSEDATE: v.CLOSEDATE ? '"'+v.CLOSEDATE.slice(0,10)+'"' : 'NULL',
			DATE_CREATE: v.DATE_CREATE ? '"'+v.DATE_CREATE.slice(0,10)+'"' : 'NULL',
			DeliveryDate: v[DEAL_UFS.DeliveryDate]
				? '"'+v[DEAL_UFS.DeliveryDate].slice(0,10)+'"'
				: 'NULL',
			FollowReasons: v[DEAL_UFS.FollowReasons]
				? '"'+uf_list[DEAL_UFS.FollowReasons].find(o=>o.ID==v[DEAL_UFS.FollowReasons]).VALUE+'"'
				: 'NULL',
			LostReasons: v[DEAL_UFS.LostReasons]
				? '"'+uf_list[DEAL_UFS.LostReasons].find(o=>o.ID==v[DEAL_UFS.LostReasons]).VALUE+'"'
				: 'NULL',
			Province: v[DEAL_UFS.Province]
				? '"'+uf_list[DEAL_UFS.Province].find(o=>o.ID==v[DEAL_UFS.Province]).VALUE+'"'
				: 'NULL',
			SalesObject: v[DEAL_UFS.SalesObject]
				? '"'+uf_list[DEAL_UFS.SalesObject].find(o=>o.ID==v[DEAL_UFS.SalesObject]).VALUE+'"'
				: 'NULL',
			TargetDate: v[DEAL_UFS.TargetDate]
				? '"'+v[DEAL_UFS.TargetDate].slice(0,10)+'"'
				: 'NULL',
		} 

		sql_values.push(`
			(${v.ID},
			${v.ASSIGNED_BY_ID},
			${v.CATEGORY_ID},
			${rebuild.CLOSEDATE},
			${Number(v.COMPANY_ID)},
			${rebuild.DATE_CREATE},
			${parseFloat(v.OPPORTUNITY)},
			${v.SOURCE_ID},
			"${v.STAGE_ID}",
			"${v.TITLE}",
			"${uf_list[DEAL_UFS.BusinessSectors].find(o=>o.ID==v[DEAL_UFS.BusinessSectors])?.VALUE}",
			${rebuild.DeliveryDate},
			${rebuild.FollowReasons},
			${rebuild.LostReasons},
			${rebuild.Province},
			${rebuild.SalesObject},
			${rebuild.TargetDate})`
		)
	})

	console.log(sql_values[0])

	/* END */

	return NextResponse.json({ deals:all })
}