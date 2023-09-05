import excuteQuery from '@/lib/db.ts' 
import { DEAL_UFS } from '@/constants'
const APP_URL = process.env.NEXT_PUBLIC_URL

/* - - - - - - - - - - */

const getItem = async (id) => {

	let res, json
	
	// 1.
	res = await fetch(
		`${ APP_URL }/api/btx/crm.deal.userfield.list`,
		{ method:'POST', headers:{'Content-Type':'application/json'} }
	)
	json = await res.json()
	const ufList = json.result
		.reduce((acc, {FIELD_NAME, LIST})=>{
			if (LIST)
				acc[FIELD_NAME]=LIST
			return acc
		},{})


	// 2.
	res = await fetch(
		`${ APP_URL }/api/btx/crm.deal.get`,
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
		SalesObject: ufList[DEAL_UFS['SalesObject']].find(o=>o.ID==result[DEAL_UFS['SalesObject']])?.VALUE,
		BusinessSectors: ufList[DEAL_UFS['BusinessSectors']].find(o=>o.ID==result[DEAL_UFS['BusinessSectors']])?.VALUE,
		TargetDate: result[DEAL_UFS['TargetDate']]?.slice(0,10) || null,
		Province: ufList[DEAL_UFS['Province']].find(o=>o.ID==result[DEAL_UFS['Province']])?.VALUE,
		LostReasons: ufList[DEAL_UFS['LostReasons']].find(o=>o.ID==result[DEAL_UFS['LostReasons']])?.VALUE,
		DeliveryDate: result[DEAL_UFS['DeliveryDate']]?.slice(0,10) || null,
		Responsible: Number(result.ASSIGNED_BY_ID),
		FollowReasons: ufList[DEAL_UFS['FollowReasons']].find(o=>o.ID==result[DEAL_UFS['FollowReasons']])?.VALUE,
		Company: Number(result.COMPANY_ID)
	}

	// console.log(rebuild)

	return rebuild
}

const sqlInsert = async (table, item) => {
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

const sqlUpdate = async (table, item) => {
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

const sqlDelete = async (table, id) => {
	const result = await excuteQuery({
		query: `DELETE FROM ${table} WHERE Id=${id}`				
	})
	console.log('DEAL DELETED :: ', id)
}
/* - - - - - - - - - - */

export const addDEAL = async (id) => {
	const item = await getItem(id)
	await sqlInsert('deals', item)
}

export const updateDEAL = async (id) => {
	const item = await getItem(id)
	await sqlUpdate('deals', item)
}

export const deleteDEAL = async (id) => {
	await sqlDelete('deals', id)
}