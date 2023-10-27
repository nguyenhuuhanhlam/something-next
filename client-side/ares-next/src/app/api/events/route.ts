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
	addLEAD,
	updateLEAD,
	deleteLEAD
	} from './lead.funcs'
import {
	addTASK,
	updateTASK,
	deleteTASK
} from './task.funcs'

/* - - - - - - - - - - */

export async function POST (req) {
	try {
		const form = await req.formData()
		const params = Object.fromEntries(form)

		const id = parseInt(params['data[FIELDS][ID]']) /* DEAL, SPA */
		const entityTypeId = parseInt(params['data[FIELDS][ENTITY_TYPE_ID]']) /* SPA */
		
		const taskBeforeId = params['data[FIELDS_BEFORE][ID]'] /* DELETE ITEM */
		const taskAfterId = params['data[FIELDS_AFTER][ID]'] /* ADD + UPDATE ITEM */

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
					addLEAD(id)
				break
			case 'ONCRMLEADUPDATE':
					updateLEAD(id)
				break
			case 'ONCRMLEADDELETE':
					deleteLEAD(id)
				break

			/* TASK */
			case 'ONTASKADD':
					addTASK(taskAfterId)
				break
			case 'ONTASKUPDATE':
					updateTASK(taskAfterId)
				break
			case 'ONTASKDELETE':
					console.log('ONTASKDELETE',taskBeforeId)
				break	
		}

	} catch (e) {
		console.log(e)
	}
	
	return NextResponse.json({ events:true })
}