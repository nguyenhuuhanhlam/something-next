import excuteQuery from '@/lib/db.ts' 
import { rebuilds } from './spa.rebuilds'

/* - - - - - - - - - - */

const getItem = async (id, entityTypeId) => {

	const res = await fetch(
		process.env.NEXT_PUBLIC_URL + '/api/btx/crm.item.get', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, entityTypeId })
		}
	)

	const json = await res.json()
	const { result:{item} } = json

	return rebuilds(entityTypeId,item)
}

const sqlInsert = async (table=null, item) =>
{
	delete item.__categoryId

	const result = await excuteQuery({
		query:
			`INSERT INTO ${table}(${Object.keys(item)}) VALUES(${Object.keys(item).map(k=>'?').join()})`,
		values: Object.values(item)
	})

	if (result?.error) {
		const e = JSON.stringify(result.error)
		console.log(JSON.parse(e).sqlMessage)
	} else
		console.log('SPA ADDED :: ', item.Id)
}

const sqlUpdate = async (table=null, item) =>
{	
	delete item.__categoryId
	const sets = Object.keys(item).map(k=>k+'=?')

	try {
		const result = await excuteQuery({
			query: `UPDATE ${table} SET ${sets} WHERE id=${item.Id}`,
			values: Object.values(item)
		})

		if (result.affectedRows==0) {
			await sqlInsert(table, item)
			console.log('SPA MISSING :: ADDED :: ', item.Id)
		} else {
			console.log('SPA UPDATED :: ', item.Id)
		}

	} catch (e) {
		console.log(e)
	}
}

const sqlDelete = async (table=null, id) => {
	const result = await excuteQuery({
		query: `DELETE FROM ${table} WHERE Id=${id}`				
	})
	console.log('SPA DELETED : ', id)
}

/* - - - - - - - - - - */

export const addSPA = async (id, entityTypeId) =>
{
	const item = await getItem(id, entityTypeId)
	const _table = `spa_${entityTypeId}_${item.__categoryId}`

	switch(_table) {
		case 'spa_131_15':
		case 'spa_132_125':
			await sqlInsert(_table, item)
			break
		default:
			console.log('NOT YET PROGRAMMING FOR THIS TABLE :', _table)
			break
	}
}

export const updateSPA = async (id, entityTypeId) =>
{
	const item = await getItem(id, entityTypeId)
	const _table = `spa_${entityTypeId}_${item.__categoryId}`

	switch(_table) {
		case 'spa_131_15':
		case 'spa_132_125':
			await sqlUpdate(_table, item)
			break
		default:
			console.log('NOT YET PROGRAMMING FOR THIS TABLE :', _table)
			break
	}
}

export const deleteSPA = async (id) =>
{
	await sqlDelete('spa_131_15', id)
	await sqlDelete('spa_132_125', id)
}