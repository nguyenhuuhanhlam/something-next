import {
	NextRequest,
	NextResponse } from 'next/server'
// import fs from 'fs'

import { DEAL_UFS } from '@/constants'

/* - - - - - - - - - - */

export async function POST (req)
{
	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	let all = []
	let options = {
		select: [
			'ID',
			'ASSIGNED_BY_ID',
			'CATEGORY_ID',
			'CLOSEDATE',
			'COMPANY_ID',
			'DATE_CREATE',
			'OPPORTUNITY',
			'SOURCE_ID',
			'STAGE_ID',
			'TITLE',
			DEAL_UFS.BusinessSectors,
			DEAL_UFS.DeliveryDate,
			DEAL_UFS.FollowReasons,
			DEAL_UFS.LostReasons,
			DEAL_UFS.Possible,
			DEAL_UFS.Province,
			DEAL_UFS.SalesObject,
			DEAL_UFS.TargetDate,
			'CONTACT_ID',
			],
			start: 0
		}
	
	const res = await fetch(
		`${ BITRIX_ENDPOINT }/crm.deal.list`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({ ...options })
		}
	)

	const { total, next, result } = await res.json()

	// 2.
	all = all.concat(result)

	// 3.
	const page_size = 50
	if (next) {
		for (let i=1; i<=Math.floor(total/page_size); i++) {
			const res = await fetch(
				`${ BITRIX_ENDPOINT }/crm.deal.list`,
				{
					method:'POST',
					headers: { 'Content-Type': 'application/json' },
					body:JSON.stringify({ ...options, start: i*page_size })
				}
			)

			const { result } = await res.json()

			all = all.concat(result)
		}
	}

	return NextResponse.json({ deals:all })
}