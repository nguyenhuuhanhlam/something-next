import { NextRequest, NextResponse } from 'next/server'
// import { io } from 'socket.io-client'

import { addSPA, updateSPA } from './spa.funcs.ts'

export async function POST (req) {
	
	//const socket = io('ws://localhost:3033')

	// - - - - - - - - - -
	/* PA1 */
	//const data = req.nextUrl
	//console.log(data)

	/* PA2 */
	try {
		const form = await req.formData()
		const params = Object.fromEntries(form)

		switch(params.event) {
			case 'ONCRMDYNAMICITEMUPDATE':
					updateSPA(
						parseInt(params['data[FIELDS][ID]']),
						parseInt(params['data[FIELDS][ENTITY_TYPE_ID]'])
					)
				break
			case 'ONCRMDYNAMICITEMADD':
				break
		}

	} catch (e) {
		console.log(e)
	}
	
	
	// - - - - - - - - - -
	//socket.emit('type-of-event', 'data of event')


	return NextResponse.json({ events:true })
} 

/* output:

	{
	  event: 'ONCRMDYNAMICITEMUPDATE',
	  'data[FIELDS][ID]': '351',
	  'data[FIELDS][ENTITY_TYPE_ID]': '132'
	}
*/