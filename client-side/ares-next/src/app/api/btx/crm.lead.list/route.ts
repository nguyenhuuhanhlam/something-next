import { NextRequest, NextResponse } from 'next/server'
import { LEAD_UFS } from '@/constants'

/* - - - - - - - - - - */

export async function POST (req)
{
	const endpoint = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	let all = []
	let options = {
		select: [
			'ID',
			'TITLE',
			'STATUS_ID',
			'SOURCE_ID',
			'OPPORTUNITY',
			'DATE_CREATE',
			'DATE_CLOSED',
			'ASSIGNED_BY_ID',
			LEAD_UFS.BusinessSectors,
			LEAD_UFS.ConvertDate,
			LEAD_UFS.FollowReasons,
			LEAD_UFS.FailedReasons,
			LEAD_UFS.Province,
			LEAD_UFS.Account,
			LEAD_UFS.SalesType,
			LEAD_UFS.SalesObject,
			'CONTACT_ID'
		],
		start: 0
	}

	const res = await fetch(
		`${ endpoint }/crm.lead.list`, {
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...options })
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
				`${ endpoint }/crm.lead.list`,
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

	return NextResponse.json({ leads:all })
}