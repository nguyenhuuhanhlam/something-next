const APP_URL = process.env['NEXT_PUBLIC_URL']

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

	console.log('-->',json.result.item.id, json.result.item.title)
	// UPDATE SQL
}