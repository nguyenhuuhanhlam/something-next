import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

const APP_URL = process.env.NEXT_PUBLIC_URL

export async function POST (req:NextRequest) {
	const res = await fetch(
		`${ APP_URL }/api/btx/crm.lead.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	/* SQL */
	let sql_values = []
	json.leads.map(v => {
		
		const rebuild = {
			Id: v.ID,
			Title: '"'+ v.TITLE +'"',
			Status: '"'+ v.STATUS_ID +'"',
		}

		sql_values.push(`(${rebuild.Id},${rebuild.Title},${rebuild.Status})`)
	})

	return NextResponse.json({ overwrite: true })
}

/*
console.log(sql_values[0]) -->

	ID: '67',
	TITLE: 'NT TT Kiểm nghiệm Mỹ Dược Thực phẩm',
	STATUS_ID: 'CONVERTED',
	SOURCE_ID: 'CALL',
	OPPORTUNITY: '400000000.00',
	DATE_CREATE: '2022-05-13T09:55:01+03:00',
	DATE_CLOSED: '2022-07-03T16:32:43+03:00',
	ASSIGNED_BY_ID: '17',
	UF_CRM_1652256472: '1155',
	UF_CRM_1648808731: '2022-07-03T03:00:00+03:00',
	UF_CRM_1651134422: null,
	UF_CRM_1651134757: null,
	UF_CRM_1651659416: '285',
	UF_CRM_1678677176: false,
	UF_CRM_1649410807: '89',
	UF_CRM_1678699905: '2497'
*/