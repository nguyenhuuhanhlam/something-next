import excuteQuery from '@/lib/db.ts' 
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

export const addSPA = (id, entityTypeId) => {
	console.log('SPA ADD')
}

export const updateSPA = async (id, entityTypeId) => {

	const item = await itemGet(id, entityTypeId)

	try {
		const result = await excuteQuery({
			query:
				`UPDATE spa_raw
				SET title=?
				WHERE id=?`,
			values: [
				item.title,
				item.id
				]
		})

		console.log('UPDATED :: ', result)
	} catch (e) {
		console.log(e)
	}
}