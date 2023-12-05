import { NextRequest, NextResponse } from 'next/server'
import { SPA_UFS } from '@/constants'

export async function POST (req)
{
	const endpoint = process.env.NEXT_PUBLIC_BITRIX_ENDPOINT_11
	let all = []
	const body = { entityTypeId: 131, filter: [{categoryId:15}] }
	const options = {
		select: [
			'id',
			'title',
			'companyId',
			'stageId',
			'createdTime',
			'movedTime',
			'assignedById',
			SPA_UFS[131]['NgayTapKet'],
			SPA_UFS[131]['NgayLapDatHoanThanh'],
			SPA_UFS[131]['NgayThuMauNoiBo'],
			SPA_UFS[131]['NgayThuMauAB'],
			SPA_UFS[131]['NgayBanGiao']
		]
	}

	const res = await fetch(
		`${ endpoint }/crm.item.list`, {
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({
				...body,
				...options
			})
		}
	)

	const { total, next, result:{items} } = await res.json()

	all = all.concat(items)

	// REPEAT //

	const page_size = 50
	if (next) {
		for (let i=1; i<=Math.floor(total/page_size); i++) {
			const res = await fetch(
				`${ endpoint }/crm.item.list`,
				{
					method:'POST',
					headers: { 'Content-Type': 'application/json' },
					body:JSON.stringify({ ...body, ...options, start: i*page_size })
				}
			)

			const { result:{items} } = await res.json()

			all = all.concat(items)
		}
	}

	return NextResponse.json({ spas: all })
}