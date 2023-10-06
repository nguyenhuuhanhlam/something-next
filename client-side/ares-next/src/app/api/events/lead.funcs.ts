import excuteQuery from '@/lib/db.ts' 
import { LEAD_UFS } from '@/constants'
const APP_URL = process.env.NEXT_PUBLIC_URL

/* - - - - - - - - - - */

const getItem = async (id) => {

	let res, json

	// 2.
	res = await fetch(
		`${ APP_URL }/api/btx/crm.lead.get`,
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({ id })
		}
	)

	json = await res.json()
	const { result } = json

	return result
}

export const updateLEAD = async (id) => {
	const item = await getItem(id)

	console.log('updateLEAD::',item.ID,' : ',item.TITLE)
	//await sqlUpdate('deals', item)
}