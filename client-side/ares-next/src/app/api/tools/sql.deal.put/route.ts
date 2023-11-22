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
			Responsible: parseInt(v.ASSIGNED_BY_ID) || 0,
			Category: parseInt(v.CATEGORY_ID),
			Company: parseInt(v.COMPANY_ID) || 0,
			Stage: v.STAGE_ID ? '"'+ v.STAGE_ID +'"' : 'NULL',
			CloseDate: v.CLOSEDATE ? '"'+ v.CLOSEDATE.slice(0,10) +'"' : 'NULL',
			CreateDate: v.DATE_CREATE ? '"'+ v.DATE_CREATE.slice(0,10) +'"' : 'NULL',
			Source: v.SOURCE_ID ? '"'+ v.SOURCE_ID +'"' : 'NULL',
			Amount: parseFloat(v.OPPORTUNITY) || 0,
			Possible: v[DEAL_UFS.Possible] ? 1 : 'NULL',
			SalesObject: v[DEAL_UFS.SalesObject] ? '"'+ list_UF[DEAL_UFS.SalesObject].find(o=>o.ID==v[DEAL_UFS.SalesObject]).VALUE +'"' : 'NULL',
			BusinessSectors: v[DEAL_UFS.BusinessSectors] ? '"'+ list_UF[DEAL_UFS.BusinessSectors].find(o=>o.ID==v[DEAL_UFS.BusinessSectors]).VALUE +'"' : 'NULL',
			TargetDate: v[DEAL_UFS.TargetDate] ? '"'+ v[DEAL_UFS.TargetDate].slice(0,10) +'"' : 'NULL',
			Province: v[DEAL_UFS.Province] ? '"'+ list_UF[DEAL_UFS.Province].find(o=>o.ID==v[DEAL_UFS.Province]).VALUE +'"' : 'NULL',
			LostReasons: v[DEAL_UFS.LostReasons] ? '"'+ list_UF[DEAL_UFS.LostReasons].find(o=>o.ID==v[DEAL_UFS.LostReasons]).VALUE +'"' : 'NULL',
			DeliveryDate: v[DEAL_UFS.DeliveryDate] ? '"'+ v[DEAL_UFS.DeliveryDate].slice(0,10) +'"' : 'NULL',
			FollowReasons: v[DEAL_UFS.FollowReasons] ? '"'+ list_UF[DEAL_UFS.FollowReasons].find(o=>o.ID==v[DEAL_UFS.FollowReasons]).VALUE +'"' : 'NULL',
			ContactID: v.CONTACT_ID || 'NULL'
		}

		sql_values.push(`
			(${r.Id},${r.Title},${r.Responsible},
			${r.Category},${r.Company},${r.Stage},${r.CloseDate},${r.CreateDate},${r.Source},
			${r.Amount},${r.Possible},${r.SalesObject},${r.BusinessSectors},${r.TargetDate},
			${r.Province},${r.LostReasons},${r.DeliveryDate},${r.FollowReasons})`)
	})

	const q = `INSERT INTO deals(Id,Title,Responsible,Category,Company,Stage,CloseDate,CreateDate,
		Source,Amount,Possible,SalesObject,BusinessSectors,TargetDate,
		Province,LostReasons,DeliveryDate,FollowReasons,ContactID) VALUES ${sql_values.join()}`.replace(/(\r\n|\n|\r|\t)/gm,'')

	const del_result = await excuteQuery({ query: 'DELETE FROM deals' })
	const ins_result = await excuteQuery({ query: q })

	return NextResponse.json({ overwrite: true })
}