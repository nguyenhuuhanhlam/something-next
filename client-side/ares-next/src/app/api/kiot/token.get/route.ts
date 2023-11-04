import { NextRequest, NextResponse } from 'next/server'

export async function POST (req) {

	const body = {
		client_id: process.env.NEXT_PUBLIC_KIOT_KANEN_CI,
		client_secret: process.env.NEXT_PUBLIC_KIOT_KANEN_CL_SECRET,
		grant_type: 'client_credentials',
		scopes: 'PublicApi.Access'
	}

	const res = await fetch(
		'https://id.kiotviet.vn/connect/token',
		{
			method:'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body:new URLSearchParams(body)
		}
	)

	const result = await res.json()

	return NextResponse.json({ result })
}