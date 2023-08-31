import { NextRequest, NextResponse } from 'next/server'
import { addSPA, updateSPA, deleteSPA } from './spa.funcs'
import { updateDeal } from './deal.funcs'

export async function POST (req) {

	try {
		const form = await req.formData()
		const params = Object.fromEntries(form)

		const id = parseInt(params['data[FIELDS][ID]']) /* DEAL, SPA */
		const entityTypeId = parseInt(params['data[FIELDS][ENTITY_TYPE_ID]']) /* SPA */

		switch(params.event) {

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

			/* LEAD */
			case 'ONCRMDEALADD':
				break
			case 'ONCRMDEALUPDATE':
				updateDeal(id)
				break
		}

	} catch (e) {
		console.log(e)
	}
	
	return NextResponse.json({ events:true })
}