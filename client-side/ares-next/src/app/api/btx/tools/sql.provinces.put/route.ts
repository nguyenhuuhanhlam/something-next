import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'
const APP_URL = process.env.NEXT_PUBLIC_URL

export async function POST (req:NextRequest) {

	const res = await fetch(
		`${ APP_URL }/api/btx/crm.contact.province.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	/* SQL */
	let sql_values = []

	json.provinces.map(v=>{
		sql_values.push(`(${v.ID},"${v.VALUE}")`)
	})

	const q = `INSERT INTO provinces(Id,ProvinceName) VALUES ${sql_values.join()}`

	const del_result = await excuteQuery({ query: 'DELETE FROM provinces' })
	const ins_result = await excuteQuery({
		query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
	})

	return NextResponse.json({ overwrite: true })
}