import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

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
		Title: v.title,
		Status: parseInt(v.status),
		Responsible: parseInt(v.groupId),
		Deadline: v.deadline?.slice(0,10) || null,
		CreatedBy: parseInt(v.reatedBy),
		ClosedBy: v.closedBy ? parseInt(v.closedBy) : null,
		CreatedDate: v.createdDate?.slice(0,10) || null,
		ClosedDate: v.closedDate?.slice(0,10) || null
	}

		sql_values.push(`(${rebuild.Id},${rebuild.Title})`)
	})

	return NextResponse.json({ overwrite: sql_values.join(',') })
}