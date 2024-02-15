import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/db'
import { ParseString as ps, ParseDateString as pds } from '@/lib/db.helpers'

export async function POST (req:NextRequest)
{
	const result = await excuteQuery({ query:'SELECT DATE_FORMAT(MAX(ChangedDate),"%Y-%m-%d") AS LastDate FROM tasks' })
	const LastDate = result[0].LastDate
	// const toDate = new Date().toISOString().slice(0,10)

	const response = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/tasks.task.range.list`,
		{
			method:'POST',
			headers:{ 'content-Type':'application/json' },
			body:JSON.stringify({
				fromDate: LastDate,
				// toDate
			})
		}
	)

	const json = await response.json()

	let sql_values = []
	json.tasks.map(v => {

		const rebuild = {
			Id: v.id,
			Title: '"' + v.title.replace(/[\r\n\t\"]/g, "|") + '"',
			Status: parseInt(v.status),
			Responsible: parseInt(v.responsibleId),
			Deadline: v.deadline ? '"' + v.deadline.slice(0,10) + '"' : 'NULL',
			CreatedBy: parseInt(v.createdBy) || 'NULL',
			ClosedBy: parseInt(v.closedBy) || 'NULL',
			CreatedDate: v.createdDate ? '"' + v.createdDate.slice(0,10) + '"' : 'NULL',
			ClosedDate: v.closedDate ? '"' + v.closedDate.slice(0,10) + '"' : 'NULL',
			ChangedDate: v.changedDate ? '"' + v.changedDate.slice(0,10) + '"' : 'NULL',
		}

		sql_values.push(`(${ Object.keys(rebuild).map(k=>rebuild[k]) })`)
	})

	const q = `INSERT INTO tasks(Id,Title,Status,Responsible,Deadline,CreatedBy,ClosedBy,CreatedDate,ClosedDate,ChangedDate) VALUES ${ sql_values.join() }`

	try {
		const del_result = await excuteQuery({ query: `DELETE FROM tasks WHERE ChangedDate>="${LastDate}"` })
		const ins_result = await excuteQuery({
			query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
		})
	} catch (e) {
		console.log(e)
	}

	return NextResponse.json({ done: q })
}