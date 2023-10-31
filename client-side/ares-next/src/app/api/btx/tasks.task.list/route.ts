import {
	NextRequest,
	NextResponse
} from 'next/server'

import _ from 'lodash'

/* - - - - - - - - - - */

export async function POST (req) {
	
	let options = {
		  select:['TITLE','STATUS','GROUP_ID','STAGE_ID','CREATED_BY','CREATED_DATE','CLOSED_BY','CLOSED_DATE','DEADLINE'],
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

	// if (next) {
	//   for (let i=1; i<=Math.floor(total/page_size); i++) {
	//       const res = await fetch(
	//           `${ process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_13'] }/tasks.task.list`,
	//           {
	//               method:'POST',
	//               headers: { 'Content-Type': 'application/json' },
	//               body:JSON.stringify({ ...options, start: i*page_size })
	//           }
	//       )

	//       const { result } = await res.json()

	//       all = all.concat(result.tasks.map(v=>_.omit(v,['group','creator','subStatus','stageId'])))
	//   }
	// }

	return NextResponse.json({ tasks:all })
}

/*
"id": "83",
"title": "Chủ trì họp định hướng thiết kế",
"status": "5"
"groupId": "0",
"deadline": "2022-04-08T05:43:50+03:00",
"createdBy": "31",
"closedBy": "19",
"createdDate": "2022-04-05T09:43:50+03:00",
"closedDate": "2022-04-05T09:47:42+03:00",




{
	 "title": "Chủ trì họp định hướng thiết kế",
	 "stageId": "0",
	 "createdBy": "31",
	 "createdDate": "2022-04-05T09:43:50+03:00",
	 "closedBy": "19",
	 "closedDate": "2022-04-05T09:47:42+03:00",
	 "deadline": "2022-04-08T05:43:50+03:00",
	 "id": "83",
	 "status": "5",
	 "groupId": "0",
	 "group": [],
	 "creator": {
		  "id": "31",
		  "name": "Trí Lê Hữu",
		  "link": "/company/personal/user/31/",
		  "icon": "https://aresen.bitrix24.com/b20600929/resize_cache/61035/c0120a8d7c10d63c83e32398d1ec4d9e/main/0bd/0bd47fd2aa7d54af2615798fcc1e2440/avatar.png",
		  "workPosition": "Phó phòng kinh doanh"
	 },
	 "subStatus": "5"
},
*/