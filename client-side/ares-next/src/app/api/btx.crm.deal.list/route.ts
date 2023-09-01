import {
	NextRequest,
	NextResponse } from 'next/server'

/* - - - - - - - - - - */

export async function POST (req) {
	
	const res = await fetch(
		`${ process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11'] }/crm.deal.list`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' }
		}
	)

	const { result } = await res.json()

	return NextResponse.json({ result })
}