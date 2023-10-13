import {
	NextRequest,
	NextResponse
} from 'next/server'

/* - - - - - - - - - - */

export async function POST (req) {
	
	let all = []

	// 1.
	const res = await fetch(
		`${ process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_13'] }/tasks.task.list`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({ ...options })
		}
	)

	const { total, next, result } = await res.json()

	// 2.
	all = all.concat(result)

	return NextResponse.json({ tasks:all })
}