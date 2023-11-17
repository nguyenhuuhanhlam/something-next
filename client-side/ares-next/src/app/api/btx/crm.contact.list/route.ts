import { NextRequest, NextResponse } from 'next/server'

export async function POST (req)
{
	const endpoint = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	const opt = {}
	const response = await fetch(
		`${ endpoint }/crm.deal.list`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...opt })
		})
	const { total, next, result } = await response.json()

	return NextResponse.json({ contacts: result })
}
