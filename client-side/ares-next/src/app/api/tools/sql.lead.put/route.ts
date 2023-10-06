import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

const APP_URL = process.env.NEXT_PUBLIC_URL

export async function POST (req:NextRequest) {
	const res = await fetch(
		`${ APP_URL }/api/btx/crm.lead.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	/* SQL */
	let sql_values = []
	json.leads.map(v=>{
		sql_values.push(`${v.ID}`)
	})

	console.log(sql_values)

	return NextResponse.json({ overwrite: true })
}