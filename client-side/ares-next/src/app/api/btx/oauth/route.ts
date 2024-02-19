import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

/* - - - - - - - - - - */

export async function POST (req)
{
	// const body = await req.json()
	// const { username,password } = body



	const checkResponse = await axios.post(process.env.NEXT_PUBLIC_BITRIX_CHECKLOGIN)
	const csrf = checkResponse.data.errors[0].customData.csrf

	const loginResponse = axios.post(process.env.NEXT_PUBLIC_BITRIX_CHECK,
		{ headers:{ 'Cookie':checkResponse.headers['set-cookie'][0], 'X-Bitrix-Csrf-Token':csrf, withCredentials: true } }
	).then(json=>{
		console.log(json.data.errors)
	})

	// 	const loginResponse = fetch(process.env.NEXT_PUBLIC_BITRIX_CHECK,{ method:'post', header:{'X-Bitrix-Csrf-Token':csrf} }).then(x=>console.log(x.json()))

	// })

	// const csrf = csrfResponse.data.errors[0].customData.csrf

	// const loginResponse = await axios.post(process.env.NEXT_PUBLIC_BITRIX_CHECK,
	// 		{ login:username, password },
	// 		{ headers:{ 'X-Bitrix-Csrf-Token':csrf } }
	// 	)

	// console.log(loginResponse.data)

	return NextResponse.json({ })
}