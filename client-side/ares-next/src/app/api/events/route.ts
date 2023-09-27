import {
	NextRequest,
	NextResponse } from 'next/server'
import {
	addSPA,
	updateSPA,
	deleteSPA } from './spa.funcs'
import {
	addDEAL,
	updateDEAL,
	deleteDEAL } from './deal.funcs'
import {
	updateLEAD
	} from './lead.funcs'

/* - - - - - - - - - - */

export async function POST (req) {
	try {
		const form = await req.formData()
		const params = Object.fromEntries(form)

		const id = parseInt(params['data[FIELDS][ID]']) /* DEAL, SPA */
		const entityTypeId = parseInt(params['data[FIELDS][ENTITY_TYPE_ID]']) /* SPA */

		switch(params.event) {

			/* USER */
			case 'ONUSERADD':
				
				break

			/* SPA */
			case 'ONCRMDYNAMICITEMADD':
					addSPA(id, entityTypeId)
				break
			case 'ONCRMDYNAMICITEMUPDATE':
					updateSPA(id, entityTypeId)
				break
			case 'ONCRMDYNAMICITEMDELETE':
					deleteSPA(id)
				break

			/* DEAL */
			case 'ONCRMDEALADD':
					addDEAL(id)
				break
			case 'ONCRMDEALUPDATE':
					updateDEAL(id)
				break
			case 'ONCRMDEALDELETE':
					deleteDEAL(id)
				break

			/* LEAD */
			case 'ONCRMLEADADD':
					console.log('EVENT::LEAD:ADD: ', id)
				break
			case 'ONCRMLEADUPDATE':
					updateLEAD(id)
				break
			case 'ONCRMLEADDELETE':
					console.log('EVENT::LEAD:DELETE: ', id)
				break
		}

	} catch (e) {
		console.log(e)
	}
	
	return NextResponse.json({ events:true })
}