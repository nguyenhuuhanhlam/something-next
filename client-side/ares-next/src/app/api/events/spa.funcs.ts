import excuteQuery from '@/lib/db.ts' 
import { UFS } from '@/constants'
const APP_URL = process.env.NEXT_PUBLIC_URL


/* - - - - - - - - - - */


const getItem = async (id, entityTypeId) => {
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

	const rebuild = {
		Id: item.id,
		Title: item.title,
		CongTy: item[UFS[132]['CongTy']],
		NgayBaoCao: item[UFS[132]['NgayBaoCao']],
		Stage: item.stageId,
		Responsible: item[UFS[132]['Responsible']],
	}

	return rebuild
}

const sqlInsert = async (table=null, item) => {
	const result = await excuteQuery({
		query:
			`INSERT INTO ${table}(${Object.keys(item)}) VALUES(${Object.keys(item).map(k=>'?').join()})`,
		values: Object.values(item)
	})

	if (result?.error) {
		const e = JSON.stringify(result.error)
		console.log(JSON.parse(e).sqlMessage)
	} else
		console.log('ADDED :: ', result)
}

const sqlUpdate = async (table=null, item) => {
	const sets = Object.keys(item).map(k=>k+'=?')

	try {
		const result = await excuteQuery({
			query: `UPDATE ${table} SET ${sets} WHERE id=${item.Id}`,
			values: Object.values(item)
		})

		console.log('UPDATED :: ', result)
	} catch (e) {
		console.log(e)
	}
}

const sqlDelete = async (table=null, id) => {
	const result = await excuteQuery({
		query: `DELETE FROM ${table} WHERE Id=${id}`				
	})
	console.log('DELETED :: ', result)
}


/* - - - - - - - - - - */


export const addSPA = async (id, entityTypeId) => {
	const item = await getItem(id, entityTypeId)
	switch (entityTypeId) {
		case 132:
				await sqlInsert('spa132_125',item)
			break
	}
}

export const updateSPA = async (id, entityTypeId) => {
	const item = await getItem(id, entityTypeId)
	switch (entityTypeId) {
		case 132:
				await sqlUpdate('spa132_125',item)
			break
	}
}

export const deleteSPA = async (id, entityTypeId) => {
	switch (entityTypeId) {
		case 132:
			await sqlDelete('spa132_125', id)
		break
	}
}