import { NextRequest, NextResponse } from 'next/server'
import _ from 'lodash'

/* - - - - - - - - - - */

export async function POST (req)
{
	const { fromDate, toDate } = await req.json()
	
	let options = {
		select:[
			'TITLE',
			'STATUS',
			'RESPONSIBLE_ID',
			'STAGE_ID',
			'CREATED_BY',
			'CREATED_DATE',
			'CHANGED_DATE',
			'CLOSED_BY',
			'CLOSED_DATE',
			'DEADLINE'
		],
		start: 0
	 }

	let all = []
	const filters = `filter[>%3DCHANGED_DATE]=${fromDate}&filter[<%3DCHANGED_DATE]=${toDate}`

	const res = await fetch(
		`${ process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_13'] }/tasks.task.list?${filters}`,
		{
			method:'POST', headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({ ...options })
		}
	)

	const { total, next, result } = await res.json()

	all = all.concat(result.tasks.map(v=>_.omit(v,['group','creator','subStatus','stageId'])))

	const page_size = 50
	if (next) {
	  for (let i=1; i<=Math.floor(total/page_size); i++) {
	      const res = await fetch(
	          `${ process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_13'] }/tasks.task.list?${filters}`,
	          {
	              method:'POST',
	              headers: { 'Content-Type': 'application/json' },
	              body:JSON.stringify({ ...options, start: i*page_size })
	          }
	      )

	      const { result } = await res.json()

	      all = all.concat(result.tasks.map(v=>_.omit(v,['group','creator','subStatus','stageId'])))
	  }
	}

	return NextResponse.json({ tasks: all, total })
}