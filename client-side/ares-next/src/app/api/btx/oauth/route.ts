import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'

/* - - - - - - - - - - */

export async function POST (req)
{
	const body = await req.json()
	const { username,password } = body

	const jar = new CookieJar()
	const client = wrapper(axios.create({ jar }))

	const x = await client.post(process.env.NEXT_PUBLIC_BITRIX_CHECKLOGIN)
	console.log('1::',x.headers['set-cookie'])

	const y = await client.post(process.env.NEXT_PUBLIC_BITRIX_CHECK,
		{},
		{ headers:{'X-Bitrix-Csrf-Token':x.data.errors[0].customData.csrf }})

	console.log('2::',y.data.errors[0]) 

	return NextResponse.json({})
}