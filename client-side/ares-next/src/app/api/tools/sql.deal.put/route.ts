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
			Amount: parseFloat(v.OPPORTUNITY),
			Possible: v[DEAL_UFS.Possible],
			SalesObject: v[DEAL_UFS.SalesObject],
			BusinessSectors: v[DEAL_UFS.BusinessSectors],
			TargetDate: v[DEAL_UFS.TargetDate],
			Province: v[DEAL_UFS.Province],
			LostReasons: v[DEAL_UFS.LostReasons],
			DeliveryDate: v[DEAL_UFS.DeliveryDate],
			Responsible: v[DEAL_UFS.Responsible],
			FollowReasons: v[DEAL_UFS.FollowReasons]
		}

		sql_values.push(rebuild)
	})

	console.log(sql_values[0])

	return NextResponse.json({ overwrite: true })
}