import excuteQuery from '@/lib/db.ts' 
import { LEAD_UFS } from '@/constants'
// const APP_URL = process.env.NEXT_PUBLIC_URL

/* - - - - - - - - - - */

const getItem = async (id) => {

	let res, json

	// 1.
	res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.lead.userfield.list`,
		{ method:'POST', headers:{'Content-Type':'application/json'} }
	)
	json = await res.json()
	const list_UF = json.result
		.reduce((acc, {FIELD_NAME, LIST})=>{
			if (LIST)
				acc[FIELD_NAME]=LIST
			return acc
		},{})

	// 2.
	res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.lead.get`,
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({ id })
		}
	)

	json = await res.json()
	const { result } = json

	const rebuild = {
		Id: id,
		Title: result.TITLE,
		Status: result.STATUS_ID,
		Source: result.SOURCE_ID,
		CloseDate: result.DATE_CLOSED?.slice(0,10) || null,
		CreateDate: result.DATE_CREATE?.slice(0,10) || null,
		BusinessSectors: list_UF[LEAD_UFS['BusinessSectors']].find(o=>o.ID==result[LEAD_UFS['BusinessSectors']])?.VALUE,
		ConvertDate: result[LEAD_UFS.ConvertDate]?.slice(0,10) || null,
		FailedReasons: list_UF[LEAD_UFS['FailedReasons']].find(o=>o.ID==result[LEAD_UFS['FailedReasons']])?.VALUE,
		Province: list_UF[LEAD_UFS['Province']].find(o=>o.ID==result[LEAD_UFS['Province']])?.VALUE,
		SalesType: list_UF[LEAD_UFS['SalesType']].find(o=>o.ID==result[LEAD_UFS['SalesType']])?.VALUE,
		Responsible: parseInt(result.ASSIGNED_BY_ID),
		Amount: parseFloat(result.OPPORTUNITY),
	}

	return rebuild
}

export const updateLEAD = async (id) => {
	const item = await getItem(id)

	console.log('updateLEAD::',item)
	//await sqlUpdate('deals', item)
} // TEST