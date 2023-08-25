import { NextRequest, NextResponse } from 'next/server'
import { io } from 'socket.io-client'

export async function POST (req) {
	
	//const socket = io('ws://localhost:3033')

	// - - - - - - - - - -
	/* PA1 */
	//const data = req.nextUrl
	//console.log(data)

	/* PA2 */
	try {
		const data = await req.formData()
		let body = Object.fromEntries(data)
		
		switch(body.event) {
			case 'ONCRMDYNAMICITEMUPDATE':
					console.log(
						'ONCRMDYNAMICITEMUPDATE :: ',
						body['data[FIELDS][ID]'], '|',
						body['data[FIELDS][ENTITY_TYPE_ID]']
						)
				break
		}

	} catch (e) {
		console.log('NO FORM DATA')
	}
	
	/* output:

		{
		  event: 'ONCRMDYNAMICITEMUPDATE',
		  'data[FIELDS][ID]': '351',
		  'data[FIELDS][ENTITY_TYPE_ID]': '132',
		  ts: '1692722035',
		  'auth[domain]': 'aresen.bitrix24.com',
		  'auth[client_endpoint]': 'https://aresen.bitrix24.com/rest/',
		  'auth[server_endpoint]': 'https://oauth.bitrix.info/rest/',
		  'auth[member_id]': '8559bb70602901c27836e1ca8138f882',
		  'auth[application_token]': '00a6r54fbip89zhv0delumtzwkeoo80g'
		}
	*/

	// - - - - - - - - - -
	//socket.emit('type-of-event', 'data of event')


	return NextResponse.json({ events:true })
} 