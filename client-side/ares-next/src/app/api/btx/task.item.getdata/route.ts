import { NextRequest, NextResponse } from 'next/server'

export async function POST (req) {

	const body = await req.json()

	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_BITRIX_ENDPOINT_13 }/task.item.getdata`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify(body)
		}
	)

	const { result } = await res.json()

	return NextResponse.json({ result })
}