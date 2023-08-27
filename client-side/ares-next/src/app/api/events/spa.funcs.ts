import excuteQuery from '@/lib/db.ts' 
const APP_URL = process.env.NEXT_PUBLIC_URL

export const addSPA = () => {
	console.log('SPA ADD')
}

export const updateSPA = async (id, entityTypeId) => {

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

	console.log('-->',item.id, item.title)
	// DO UPDATE SQL
	try {
		const result = await excuteQuery({
			query: 'UPDATE spa_raw SET title=? WHERE id=?',
			values: [ item.title, item.id ]
		})

		console.log('UPDATE :: ', result)
	} catch (e) {
		console.log(e)
	}

}