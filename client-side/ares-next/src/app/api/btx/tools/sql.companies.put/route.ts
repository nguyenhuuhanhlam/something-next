import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

const APP_URL = process.env.NEXT_PUBLIC_URL

export async function POST (req:NextRequest) {

	const res = await fetch(
		`${ APP_URL }/api/btx/crm.company.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	/* SQL */
	let sql_values = []

	json.companies.map(v =>
	{
		const rebuild = {
			Id: v.ID,
			CompanyName: '"' + v.TITLE.replace(/[\r\n\t\"]/g, "|") + '"',
			Responsible: parseInt(v.ASSIGNED_BY_ID),
			CreatedDate: v.DATE_CREATE ? '"' + v.DATE_CREATE.slice(0,10) + '"' : 'NULL',
			ModifyDate: v.DATE_MODIFY ? '"' + v.DATE_MODIFY.slice(0,10) + '"' : 'NULL',
		}

		sql_values.push(`(${ Object.keys(rebuild).map(k=>rebuild[k]) })`)
	})

	const q = `INSERT INTO companies(Id,CompanyName,Responsible,CreatedDate,ModifyDate) VALUES ${sql_values.join()}`

	const del_result = await excuteQuery({ query: 'DELETE FROM companies' })
	const ins_result = await excuteQuery({
		query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
	})

	return NextResponse.json({ overwrite: true })
}