import { NextRequest, NextResponse } from 'next/server'
import { addSPA, updateSPA, deleteSPA } from './spa.funcs.ts'

export async function POST (req) {

	try {
		const form = await req.formData()
		const params = Object.fromEntries(form)

		const id = parseInt(params['data[FIELDS][ID]'])
		const entityTypeId = parseInt(params['data[FIELDS][ENTITY_TYPE_ID]'])

		switch(params.event) {

			/* SPA */
			case 'ONCRMDYNAMICITEMADD':
					addSPA(id, entityTypeId)
				break
			case 'ONCRMDYNAMICITEMUPDATE':
					updateSPA(id, entityTypeId)
				break
			case 'ONCRMDYNAMICITEMDELETE':
					console.log(params)
					deleteSPA(id, entityTypeId)
				break

			/* LEAD */
			case 'ONCRMDEALADD':
				break
			case 'ONCRMDEALUPDATE':
				console.log('ONCRMDEALUPDATE : ', params)
				break
		}

	} catch (e) {
		console.log(e)
	}
	
	return NextResponse.json({ events:true })
} 