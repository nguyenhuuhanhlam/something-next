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

	const logres = await client.post(process.env.NEXT_PUBLIC_BITRIX_CHECKLOGIN)
	const csrf = logres.data.errors[0].customData.csrf

	const log = await client.postForm(process.env.NEXT_PUBLIC_BITRIX_CHECK,
		{ login:username, password },
		{ headers:{ 'X-Bitrix-Csrf-Token':csrf } }
		)

	// const log = await client.post({
	// 	method:'post',
	// 	url: process.env.NEXT_PUBLIC_BITRIX_CHECK,
	// 	headers: { 'X-Bitrix-Csrf-Token':csrf },
	// 	data: { login:username, password }
	// })

	console.log(log.data)

	return NextResponse.json({})
}