import excuteQuery from '@/lib/db.ts' 
import { UFS } from '@/constants'
const APP_URL = process.env.NEXT_PUBLIC_URL

const itemGet = async (id, entityTypeId) => {
	const res = await fetch(
		APP_URL + '/api/btx.crm.item.get',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, entityTypeId })
		}
	)

	const json = await res.json()
	const { result:{item} } = json

	return item
}

export const addSPA = async (id, entityTypeId) => {
	const item = await itemGet(id, entityTypeId)
	
	const v = {
		Id: item.id,
		Title: item.title,
		CongTy: item[UFS[132]['CongTy']],
		NgayBaoCao: item[UFS[132]['NgayBaoCao']],
		Stage: item.stageId,
		Responsible: item[UFS[132]['Responsible']],
	}

	try {
		const result = await excuteQuery({
			query:
				`INSERT INTO spa132_125(${Object.keys(v)}) 
				VALUES(?,?,?,?,?,?)`,
			values: Object.values(v)
		})

		console.log('ADDED :: ', result)
	} catch (e) {
		console.log(e)
	}
}

export const updateSPA = async (id, entityTypeId) => {

	// const item = await itemGet(id, entityTypeId)

	// try {
	// 	const result = await excuteQuery({
	// 		query:
	// 			`UPDATE spa_raw
	// 			SET title=?
	// 			WHERE id=?`,
	// 		values: [
	// 			item.title,
	// 			item.id
	// 			]
	// 	})

	// 	console.log('UPDATED :: ', result)
	// } catch (e) {
	// 	console.log(e)
	// }
}