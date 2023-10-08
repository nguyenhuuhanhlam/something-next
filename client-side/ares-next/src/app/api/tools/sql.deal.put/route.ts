import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

import { DEAL_UFS } from '@/constants'

export async function POST (req:NextRequest) {

	/* GET */
	const res_UF = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.deal.userfield.list`,
		{ method:'POST', headers:{'Content-Type':'application/json'} }
	)

	const json_UF = await res_UF.json()
	const list_UF = json_UF.result
		.reduce((acc, {FIELD_NAME, LIST})=>{
			if (LIST)
				acc[FIELD_NAME]=LIST
			return acc
		},{})

	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.deal.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	/* SQL */
	let sql_values = []

	json.deals.map(v => {
		const r = {
			Id: parseInt(v.ID),
			Title: '"'+ v.TITLE +'"',
			Responsible: parseInt(v.ASSIGNED_BY_ID),
			Category: parseInt(v.CATEGORY_ID),
			Company: parseInt(v.COMPANY_ID),
			Stage: v.STAGE_ID ? '"'+ v.STAGE_ID +'"' : 'NULL',
			CloseDate: v.CLOSEDATE ? '"'+ v.CLOSEDATE.slice(0,10) +'"' : 'NULL',
			CreateDate: v.DATE_CREATE ? '"'+ v.DATE_CREATE.slice(0,10) +'"' : 'NULL',
			Source: v.SOURCE_ID ? '"'+ v.SOURCE_ID +'"' : 'NULL',
			Amount: parseFloat(v.OPPORTUNITY),
			Possible: v[DEAL_UFS.Possible],
			SalesObject: parseInt(v[DEAL_UFS.SalesObject]),
			BusinessSectors: parseInt(v[DEAL_UFS.BusinessSectors]),
			TargetDate: v[DEAL_UFS.TargetDate],
			Province: parseInt(v[DEAL_UFS.Province]),
			LostReasons: v[DEAL_UFS.LostReasons],
			DeliveryDate: v[DEAL_UFS.DeliveryDate] ? '"'+ v[DEAL_UFS.DeliveryDate] +'"' : 'NULL',
			FollowReasons: v[DEAL_UFS.FollowReasons]
		}

		sql_values.push(`
			(${r.Id},${r.Title},${r.Responsible},
			${r.Category},${r.Company},${r.Stage},${r.CloseDate},${r.CreateDate},${r.Source},
			${r.Amount},${r.Possible},${r.SalesObject},${r.BusinessSectors},${r.TargetDate},
			${r.Province},${r.LostReasons},${r.DeliveryDate},${r.FollowReasons})`
			.replace(/(\r\n|\n|\r|\t)/gm,'')
		)
	})

	const q = `INSERT INTO
		deals_clone(Id,Title,Responsible,Category,Company,Stage,CloseDate,CreateDate,
		Source,Amount,Possible,SalesObject,BusinessSectors,TargetDate,
		Province,LostReasons,DeliveryDate,FollowReasons) VALUES ${sql_values.join()}`

	console.log(sql_values)

	return NextResponse.json({ overwrite: true })
}