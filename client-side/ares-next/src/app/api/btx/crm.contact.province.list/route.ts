import { NextRequest, NextResponse } from 'next/server'

export async function POST (req)
{
	const endpoint = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	const opt = { ID:737 }
	const response = await fetch(
		`${ endpoint }/crm.contact.userfield.get`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...opt })
		})
	const { result } = await response.json()

	return NextResponse.json({ provinces: result.LIST })
}
