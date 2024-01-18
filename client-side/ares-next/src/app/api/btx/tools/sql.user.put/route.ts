import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

export async function POST (req:NextRequest) {

	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/user.get`, {
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

	const q =
		`INSERT INTO users(
				Id,
				Active,
				Email,
				UserName,
				LastName,
				SecondName,
				Birthday,
				Mobile,
				Phone,
				Position,
				Department)
		VALUES ${sql_values.join()}`

	const del_result = await excuteQuery({ query: 'DELETE FROM users' })
	const ins_result = await excuteQuery({
		query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
	})

	/* END.SQL */

	return NextResponse.json({ overwrite: true })
}