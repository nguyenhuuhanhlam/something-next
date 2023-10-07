import {
	NextRequest,
	NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

const APP_URL = process.env.NEXT_PUBLIC_URL
import { DEAL_UFS } from '@/constants'

export async function POST (req:NextRequest) {

	/* GET */
	const res = await fetch(
		`${ APP_URL }/api/btx/crm.deal.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	/* SQL */
	let sql_values = []

	json.deals.map(v => {

		const rebuild = {
			Id: v.ID,
			Title: v.TITLE,
			Responsible: v.ASSIGNED_BY_ID,
			Category: v.CATEGORY_ID,
			Company: v.COMPANY_ID,
			Stage: v.STAGE_ID,
			CloseDate: v.CLOSEDATE,
			CreateDate: v.DATE_CREATE,
			Source: v.SOURCE_ID,
			Amount: v.OPPORTUNITY,
			Possible: v[DEAL_UFS.Possible],
			SalesObject:
			BusinessSectors:
			TargetDate:
			Province:
			LostReasons:
			DeliveryDate:
			Responsible:
			FollowReasons:
		}

		sql_values.push(rebuild)
	})

	console.log(sql_values[0])

	return NextResponse.json({ overwrite: true })
}