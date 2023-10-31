import { NextRequest, NextResponse } from 'next/server'
import _ from 'lodash'

/* - - - - - - - - - - */

export async function POST (req) {
	
	let options = {
		select:[
			'TITLE',
			'STATUS',
			'RESPONSIBLE_ID',
			'STAGE_ID',
			'CREATED_BY',
			'CREATED_DATE',
			'CLOSED_BY',
			'CLOSED_DATE',
			'DEADLINE'
		],
		start: 0
	 }

	let all = []

	// 1.
	const res = await fetch(
		`${ process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_13'] }/tasks.task.list`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({ ...options })
		}
	)

	const { total, next, result } = await res.json()

	// 2.
	all = all.concat(result.tasks.map(v=>_.omit(v,['group','creator','subStatus','stageId'])))

	// 3.
	const page_size = 50

	if (next) {
	  for (let i=1; i<=Math.floor(total/page_size); i++) {
	      const res = await fetch(
	          `${ process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_13'] }/tasks.task.list`,
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

	return NextResponse.json({ tasks:all })
}