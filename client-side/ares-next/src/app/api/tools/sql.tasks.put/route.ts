import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'
import fs from 'fs'

export async function POST (req:NextRequest) {
	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/tasks.task.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	let sql_values = []
	json.tasks.map(v=>{

	const rebuild = {
		Id: v.id,
		Title: '"' + v.title.replace(/[\r\n\t\"]/g, "|") + '"',
		Status: parseInt(v.status),
		Responsible: parseInt(v.responsibleId),
		Deadline: v.deadline ? '"' + v.deadline.slice(0,10) + '"' : 'NULL',
		CreatedBy: parseInt(v.createdBy) || 'NULL',
		ClosedBy: parseInt(v.closedBy) || 'NULL',
		CreatedDate: v.createdDate ? '"' + v.createdDate.slice(0,10) + '"' : 'NULL',
		ClosedDate: v.closedDate ? '"' + v.closedDate.slice(0,10) + '"' : 'NULL'
	}

		sql_values.push(`(${ Object.keys(rebuild).map(k=>rebuild[k]) })`)
	})

	const q = `INSERT INTO tasks(Id,Title,Status,Responsible,Deadline,CreatedBy,ClosedBy,CreatedDate,ClosedDate) VALUES ${ sql_values.join() }`

	// try {
	// 	const del_result = await excuteQuery({ query: 'DELETE FROM tasks' })
	// 	const ins_result = await excuteQuery({
	// 		query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
	// 	})
	// } catch (e) {
	// 	console.log(e)
	// }


	fs.writeFile('./public/uploads/tasks.sql',q,err=>{
		if (err) console.log(err)
		else console.log('OK')
	})


	return NextResponse.json({ done:true })
}