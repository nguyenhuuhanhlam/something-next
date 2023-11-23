import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

import { LEAD_UFS } from '@/constants'

export async function POST (req:NextRequest) {

	/* GET */
	const res_UF = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.lead.userfield.list`,
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
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.lead.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	/* SQL */
	let sql_values = []
	json.leads.map(v => {
		
		const r = {
			Id: parseInt(v.ID),
			Title: '"'+ v.TITLE +'"',
			Status: '"'+ v.STATUS_ID +'"',
			Source: v.SOURCE_ID ? '"'+ v.SOURCE_ID +'"' : 'NULL',
			Amount: parseFloat(v.OPPORTUNITY) || 0,
			CreateDate: v.DATE_CREATE ? '"'+ v.DATE_CREATE.slice(0,10) +'"' : 'NULL',
			CloseDate: v.DATE_CLOSED ? '"'+ v.DATE_CLOSED.slice(0,10) +'"' : 'NULL',
			BusinessSectors: v[LEAD_UFS.BusinessSectors] ? '"'+ list_UF[LEAD_UFS.BusinessSectors].find(o=>o.ID==v[LEAD_UFS.BusinessSectors]).VALUE +'"' : 'NULL',
			ConvertDate: v[LEAD_UFS.ConvertDate] ? '"'+ v[LEAD_UFS.ConvertDate].slice(0,10) +'"' : 'NULL',
			FailedReasons: v[LEAD_UFS.FailedReasons] ? '"'+ list_UF[LEAD_UFS.FailedReasons].find(o=>o.ID==v[LEAD_UFS.FailedReasons]).VALUE +'"' : 'NULL',
			Province: v[LEAD_UFS.Province] ? '"'+ list_UF[LEAD_UFS.Province].find(o=>o.ID==v[LEAD_UFS.Province]).VALUE +'"' : 'NULL',
			SalesType: v[LEAD_UFS.SalesType] ? '"'+ list_UF[LEAD_UFS.SalesType].find(o=>o.ID==v[LEAD_UFS.SalesType]).VALUE +'"' : 'NULL',
			Responsible: parseInt(v.ASSIGNED_BY_ID) || 0,
			SalesObject: v[LEAD_UFS.SalesObject] ? '"'+ list_UF[LEAD_UFS.SalesObject].find(o=>o.ID==v[LEAD_UFS.SalesObject]).VALUE +'"' : 'NULL',
			ContactID: v.CONTACT_ID || 'NULL'
		}

		sql_values.push(`
			(${r.Id},${r.Title},${r.Status},
			${r.Source},${r.Amount},${r.CreateDate},${r.CloseDate},
			${r.BusinessSectors},${r.ConvertDate},
			${r.FailedReasons},${r.Province},${r.SalesType},${r.Responsible},${r.SalesObject},${r.ContactID})`)
	})

	const q = `INSERT INTO leads(Id,Title,Status,
		Source,Amount,CreateDate,CloseDate,
		BusinessSectors,ConvertDate,FailedReasons,
		Province,SalesType,Responsible,SalesObject,ContactID) 
		VALUES ${sql_values.join()}`.replace(/(\r\n|\n|\r|\t)/gm,'')

	const del_result = await excuteQuery({ query: 'DELETE FROM leads' })
	const ins_result = await excuteQuery({ query: q })

	return NextResponse.json({ overwrite: true })
}