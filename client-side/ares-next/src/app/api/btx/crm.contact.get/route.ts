import { NextRequest, NextResponse } from 'next/server'

export async function POST (req) {
	
	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']

	const body = await req.json()

	const res = await fetch(
		`${ BITRIX_ENDPOINT }/crm.contact.get`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify(body)
		}
	)

	const { result } = await res.json()

	return NextResponse.json({ result })
}