import { NextRequest, NextResponse } from 'next/server'

/* - - - - - - - - - - */

export async function POST (req) {

	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	let all = []
	let options = { select: ['ID','TITLE','ASSIGNED_BY_ID','DATE_CREATE','DATE_MODIFY'],	start: 0 }

	// 1.
	const res = await fetch(
		`${ BITRIX_ENDPOINT }/crm.company.list`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({ ...options })
		}
	)

	const { total, next, result } = await res.json()

	// 2.
	all = all.concat(result)

	// 3.
	const page_size = 50
	if (next) {
		for (let i=1; i<=Math.floor(total/page_size); i++) {
			const res = await fetch(
				`${ BITRIX_ENDPOINT }/crm.company.list`,
				{
					method:'POST',
					headers: { 'Content-Type': 'application/json' },
					body:JSON.stringify({ ...options, start: i*page_size })
				}
			)

			const { result } = await res.json()

			all = all.concat(result)
		}
	}

	return NextResponse.json({ companies:all })
}