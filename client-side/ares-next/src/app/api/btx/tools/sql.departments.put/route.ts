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

	const json = await res.json()

	/* SQL */
	let sql_values = []

	json.departments.map(v=>{
		const rebuild = {
			Id: v.ID,
			Name: '"' + v.NAME + '"',
			Parent: v.PARENT ?? 'NULL' ,
			Head: v.UF_HEAD ?? 'NULL'
		}

		sql_values.push(`(${ Object.keys(rebuild).map(k=>rebuild[k]) })`)
	})

	const q = `INSERT INTO departments(Id,Name,Parent,Head) VALUES ${ sql_values.join() }`

	try {
		const del_result = await excuteQuery({ query: 'DELETE FROM departments' })
		const ins_result = await excuteQuery({
			query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
		})
	} catch (e) {
		console.log(e)
	}

	return NextResponse.json({ overwrite: true })
}