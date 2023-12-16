import { NextRequest, NextResponse } from 'next/server'
import { SPA_UFS } from '@/constants'

export async function POST (req)
{
	const endpoint = process.env.NEXT_PUBLIC_BITRIX_ENDPOINT_11
	let all = []

	const body = { entityTypeId: 136, filter: [{ categoryId:121 }] }
	
	const options = {
		select: [
			'id',
			'title',
			'stageId',
			'createdTime',
			'movedTime',
			'assignedById',
			SPA_UFS[136]['NgayKyHopDong'],
			SPA_UFS[136]['GiaTriHopDong'],
			SPA_UFS[136]['GiaGocPheDuyet'],
			SPA_UFS[136]['DaThu'],
			SPA_UFS[136]['DaChi'],
			SPA_UFS[136]['PhatSinh'],
			SPA_UFS[136]['ConThu'],
			SPA_UFS[136]['ConChi'],
			SPA_UFS[136]['DaDauTu'],
			SPA_UFS[136]['TyLePhaSinhGiaGoc'],
			SPA_UFS[136]['BienPhiDuAn'],
			SPA_UFS[136]['E01QuanLyBaiViet']
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