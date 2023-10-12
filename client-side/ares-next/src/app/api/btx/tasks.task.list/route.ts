import {
	NextRequest,
	NextResponse
} from 'next/server'

/* - - - - - - - - - - */

export async function POST (req) {
	
	// 1.
	const res = await fetch(
		`${ BITRIX_ENDPOINT }/crm.lead.list`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({ ...options })
		}
	)

	return NextResponse.json({ tasks:[] })
}