import {
	NextRequest,
	NextResponse } from 'next/server'

import { DEAL_UFS } from '@/constants'

/* - - - - - - - - - - */

export async function POST (req) {
	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	let all = []
	let options = {
		select: [
			'ID',
			'TITLE',
			'CATEGORY_ID',
			'ASSIGNED_BY_ID',
			'COMPANY_ID',
			'STAGE_ID',
			'SOURCE_ID',
			'CLOSEDATE',
			'DATE_CREATE',
			'OPPORTUNITY',
			DEAL_UFS.Possible,
			DEAL_UFS.SalesObject,
			DEAL_UFS.BusinessSectors,
			DEAL_UFS.TargetDate,
			DEAL_UFS.Province,
			DEAL_UFS.FollowReasons,
			DEAL_UFS.LostReasons,
			DEAL_UFS.DeliveryDate,
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

	// 2

	all = all.concat(result)

	// 3

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