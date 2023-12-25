import { NextRequest,NextResponse } from 'next/server'

export async function POST (req)
{
	const body = {
		client_id: process.env.NEXT_PUBLIC_KIOT_KANEN_CLIENT_ID,
		client_secret: process.env.NEXT_PUBLIC_KIOT_KANEN_CLIENT_SECRET,
		grant_type: 'client_credentials',
		scopes: 'PublicApi.Access'
	}

	const res = await fetch(
		'https://id.kiotviet.vn/connect/token',
		{ method:'POST', headers: { 'Content-Type':'application/x-www-form-urlencoded' }, body:new URLSearchParams(body) }
	)

	const { access_token }  = await res.json()

	return NextResponse.json({ access_token })
}