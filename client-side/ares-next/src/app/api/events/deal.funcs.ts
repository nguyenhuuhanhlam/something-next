import excuteQuery from '@/lib/db.ts' 
import { DEAL_UFS } from '@/constants'
const APP_URL = process.env.NEXT_PUBLIC_URL

/* - - - - - - - - - - */

const getItem = async (id) => {

	let res, json
	
	// 1.
	res = await fetch(
		`${ APP_URL }/api/btx.crm.deal.userfield.list`,
		{ method:'POST', headers:{'Content-Type':'application/json'} }
	)
	json = await res.json()
	const ufList = json.result

	// 2.
	res = await fetch(
		`${ APP_URL }/api/btx.crm.deal.get`,
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
		Category: Number(result.CATEGORY_ID),
		Stage: result.STAGE_ID,
		CloseDate: result.CLOSEDATE?.slice(0,10) || null,
		CreateDate: result.DATE_CREATE?.slice(0,10) || null,
		Source: result.SOURCE_ID,
		Amount: parseFloat(result.OPPORTUNITY),
		Possible: Number(result[DEAL_UFS['Possible']]),
		SalesObject: result[DEAL_UFS['SalesObject']],
		BusinessSectors: result[DEAL_UFS['BusinessSectors']],
		TargetDate: result[DEAL_UFS['TargetDate']]?.slice(0,10) || null,
		Province: result[DEAL_UFS['Province']],
		LostReasons: result[DEAL_UFS['LostReasons']],
		DeliveryDate: result[DEAL_UFS['DeliveryDate']]?.slice(0,10) || null,
		Responsible: result.ASSIGNED_BY_ID,
		FollowReasons: result[DEAL_UFS['FollowReasons']],
		Company: result.COMPANY_ID
	}

	console.log(ufList[0],rebuild)

	return null
}

const sqlInsert = async (table=null, item) => {
	const result = await excuteQuery({
		query: `INSERT INTO ${table}(${Object.keys(item)}) VALUES(${Object.keys(item).map(k=>'?').join()})`,
		values: Object.values(item)
	})

	if (result?.error) {
		const e = JSON.stringify(result.error)
		console.log(JSON.parse(e).sqlMessage)
	} else
		console.log('DEAL ADDED :: ', item.Id)
}

const sqlUpdate = async (table=null, item) => {
	const sets = Object.keys(item).map(k=>k+'=?')

	try {
		const result = await excuteQuery({
			query: `UPDATE ${table} SET ${sets} WHERE id=${item.Id}`,
			values: Object.values(item)
		})

		console.log('DEAL UPDATED :: ', item.Id)
	} catch (e) {
		console.log(e)
	}
}

/* - - - - - - - - - - */

export const addDEAL = async (id) => {
	const item = await getItem(id)
	// console.log(item)
	// await sqlInsert(`deal_${item.Category}`, item)
}

export const updateDEAL = async (id) => {
	const item = await getItem(id)
	// console.log(item)
	// await sqlUpdate(`deal_${item.Category}`, item)
}

export const deleteDEAL = async (id) => {
	// await sqlDelete('deal_0', id)
}