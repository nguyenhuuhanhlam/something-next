import {
	NextRequest,
	NextResponse } from 'next/server'

import { LEAD_UFS } from '@/constants'

/* - - - - - - - - - - */

export async function POST (req) {

	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	let all = []
	let options = {
		select: [
			'ID','TITLE','STATUS_ID','SOURCE_ID','OPPORTUNITY',
			'DATE_CREATE','DATE_CLOSED','ASSIGNED_BY_ID',
			LEAD_UFS.BusinessSectors, LEAD_UFS.ConvertDate,
			LEAD_UFS.FOLLOW_REASONS, LEAD_UFS.FAILED_REASONS,
			LEAD_UFS.PROVINCE, LEAD_UFS.ACCOUNT, LEAD_UFS.SALES_TYPE, LEAD_UFS.SALES_OBJECT
		],
		start: 0
	}
	
	const res = await fetch(
		`${ BITRIX_ENDPOINT }/crm.lead.list`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({ ...options })
		}
	)

	const { result } = await res.json()

	return NextResponse.json({ result })
}