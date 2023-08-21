import { NextRequest, NextResponse } from 'next/server'
import { io } from 'socket.io-client'

export async function POST (req) {
	
	const socket = io('ws://localhost:3033')

	// - - - - - - - - - -
	/* PA1 */
	const data = req.nextUrl.searchParams.get('hello')

	/* PA2 */
	// const data = await req.formData()
	// let body = Object.fromEntries(data)

	// - - - - - - - - - -
	socket.emit('type-of-event', 'data of event')


	return NextResponse.json({ events:true })
} 