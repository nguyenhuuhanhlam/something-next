import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

const APP_URL = process.env.NEXT_PUBLIC_URL

export async function POST (req:NextRequest) {

	const res = await fetch(
		`${ APP_URL }/api/btx/user.get`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	/* SQL */

	let sql_values = []
	json.users.map(v=>{
		const rebuild = {
			Id: v.ID,
			Active: v.ACTIVE ? 1 : 0,
			Email: '"'+ v.EMAIL +'"',
			UserName: v.NAME ? '"'+ v.NAME +'"' : 'NULL',
			LastName: v.LAST_NAME ? '"'+ v.LAST_NAME +'"' : 'NULL',
			SecondName: v.SECOND_NAME ? '"'+ v.SECOND_NAME +'"' : 'NULL',
			Birthday: v.PERSONAL_BIRTHDAY ? '"'+ v.PERSONAL_BIRTHDAY.slice(0,10) +'"' : 'NULL',
			Mobile: v.PERSONAL_MOBILE ? '"'+ v.PERSONAL_MOBILE +'"' : 'NULL',
			Phone: v.WORK_PHONE ? '"'+ v.WORK_PHONE +'"' : 'NULL',
			Position: v.WORK_POSITION ? '"'+ v.WORK_POSITION +'"' : 'NULL',
			Department: v.UF_DEPARTMENT ? v.UF_DEPARTMENT[0] : 'NULL'
		}

		sql_values.push(`(
			${rebuild.Id},${rebuild.Active},
			${rebuild.Email},${rebuild.UserName},${rebuild.LastName},${rebuild.SecondName},
			${rebuild.Birthday},
			${rebuild.Mobile},${rebuild.Phone},
			${rebuild.Position},${rebuild.Department})`
		)
	})

	console.log(sql_values.join())

	return NextResponse.json({ overwrite: true })
}

/*
{
"ID": "11",
"XML_ID": "38262651",
"ACTIVE": true,
"NAME": "ARES",
"LAST_NAME": "Admin",
"SECOND_NAME": "",
"EMAIL": "admin@aresen.vn",
"LAST_LOGIN": "2023-09-19T03:34:04+03:00",
"DATE_REGISTER": "2022-02-19T03:00:00+03:00",
"TIME_ZONE": "",
"IS_ONLINE": "Y",
"TIME_ZONE_OFFSET": "14400",
"TIMESTAMP_X": {},
"LAST_ACTIVITY_DATE": {},
"PERSONAL_GENDER": "",
"PERSONAL_WWW": "",
"PERSONAL_BIRTHDAY": "2003-10-28T03:00:00+03:00",
"PERSONAL_PHOTO": "https://cdn.bitrix24.com/b20600929/main/3e8/3e89afd6d67f953b13187cae0a6a0841/Artboard 8 copy 3.png",
"PERSONAL_MOBILE": "",
"PERSONAL_CITY": "",
"WORK_PHONE": "",
"WORK_POSITION": "Quản trị hệ thống",
"UF_EMPLOYMENT_DATE": "2003-10-28T03:00:00+03:00",
"UF_DEPARTMENT": [
    69
],
"USER_TYPE": "employee"
}
*/