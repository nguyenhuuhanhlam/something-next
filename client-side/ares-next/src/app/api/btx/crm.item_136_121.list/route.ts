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

	// 		SPA_UFS[136]['NgayThuThapDuTaiLieu'],
	// 		SPA_UFS[136]['NgayHoanThanhBaiViet'],
	// 		SPA_UFS[136]['NgayNopThamDinh'],
	// 		SPA_UFS[136]['NgayThamDinh'],
	// 		SPA_UFS[136]['NgayNopChinhSua'],
	// 		SPA_UFS[136]['NgayNhanQuyetDinh'],
	// 		SPA_UFS[136]['NgayNghiemThuBanGiao'],
	// 		SPA_UFS[136]['HienTrang'],
	// 		SPA_UFS[136]['KhoKhan'],
	// 		SPA_UFS[136]['GiaiPhap']
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

	// // REPEAT //

	// const page_size = 50
	// if (next) {
	// 	for (let i=1; i<=Math.floor(total/page_size); i++) {
	// 		const res = await fetch(
	// 			`${ endpoint }/crm.item.list`,
	// 			{
	// 				method:'POST',
	// 				headers: { 'Content-Type': 'application/json' },
	// 				body:JSON.stringify({ ...body, ...options, start: i*page_size })
	// 			}
	// 		)

	// 		const { result:{items} } = await res.json()

	// 		all = all.concat(items)
	// 	}
	// }

	return NextResponse.json({ spas: all })
}