import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/kiot.db'
import { ParseString as ps, ParseDateString as pds } from '@/lib/db.helpers'


export async function POST (req:NextRequest)
{
	const response = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/kiot/invoice.range.list`,
		{
			method:'POST',
			headers:{ 'content-Type':'application/json' },
			body:JSON.stringify({fromPurchaseDate: 'ngay cuoi cung cua sql hien huu', toPurchaseDate: 'ngay hhom nay'})
		}
	)
	const json = await response.json()

	return NextResponse.json({ overwrite: true })
}