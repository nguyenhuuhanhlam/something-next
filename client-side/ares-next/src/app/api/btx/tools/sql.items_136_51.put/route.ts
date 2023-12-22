import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/db'
import { ParseString as ps, ParseDateString as pds } from '@/lib/db.helpers'
import { SPA_UFS } from '@/constants'

export async function POST (req:NextRequest)
{
	const table = 'spa_136_51'
	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.item_136_51.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await res.json()

	/* SQL */
	let sql_values = []
	json.spas.map(v => {
		const item = {
			Id: v.id,
			Title: ps(v.title),
			CreatedDate: pds(v.createdTime),
			MovedDate: pds(v.movedTime),
			Stage: ps(v.stageId),
			CompanyID: v.companyId || 'NULL',
			Responsible: v.assignedById || 'NULL',

			NgayThuThapDuTaiLieu: pds(v[SPA_UFS[136]['NgayThuThapDuTaiLieu']]),
			NgayHoanThanhBaiViet: pds(v[SPA_UFS[136]['NgayHoanThanhBaiViet']]),
			NgayNopThamDinh: pds(v[SPA_UFS[136]['NgayNopThamDinh']]),
			NgayThamDinh: pds(v[SPA_UFS[136]['NgayThamDinh']]),
			NgayNopChinhSua: pds(v[SPA_UFS[136]['NgayNopChinhSua']]),
			NgayNhanQuyetDinh: pds(v[SPA_UFS[136]['NgayNhanQuyetDinh']]),
			NgayNghiemThuBanGiao: pds(v[SPA_UFS[136]['NgayNghiemThuBanGiao']]),
			HienTrang: ps(v[SPA_UFS[136]['HienTrang']]),
			KhoKhan: ps(v[SPA_UFS[136]['KhoKhan']]),
			GiaiPhap: ps(v[SPA_UFS[136]['GiaiPhap']]),
		}

		sql_values.push(`(${ Object.keys(item).map(k=>item[k]) })`)
	})

	const q = `INSERT INTO ${table}
				(Id,Title,CreatedDate,MovedDate,Stage,CompanyID,Responsible,
				NgayThuThapDuTaiLieu,NgayHoanThanhBaiViet,NgayNopThamDinh,
				NgayThamDinh,NgayNopChinhSua,NgayNhanQuyetDinh,NgayNghiemThuBanGiao,HienTrang,KhoKhan,GiaiPhap)
			VALUES ${sql_values.join()}`

	try {
		const del_result = await excuteQuery({ query: `DELETE FROM ${table}` })
		const ins_result = await excuteQuery({
			query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
		})
	} catch (e) {
		console.log(e)
	}

	return NextResponse.json({ overwrite: true })
}