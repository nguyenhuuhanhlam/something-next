import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

export async function POST (req:NextRequest)
{
	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/department.get`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	return NextResponse.json({ overwrite: true })
}