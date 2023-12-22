import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/db'
import { ParseString as ps, ParseDateString as pds } from '@/lib/db.helpers'
import { SPA_UFS } from '@/constants'

export async function POST (req:NextRequest)
{
	const table = 'spa_131_15'
	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.item_131_15.list`, {
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
			NgayTapKet: pds(v[SPA_UFS[131]['NgayTapKet']]),
			NgayLapDatHoanThanh: pds(v[SPA_UFS[131]['NgayLapDatHoanThanh']]),
			NgayThuMauNoiBo: pds(v[SPA_UFS[131]['NgayThuMauNoiBo']]),
			NgayThuMauAB: pds(v[SPA_UFS[131]['NgayThuMauAB']]),
			NgayBanGiao: pds(v[SPA_UFS[131]['NgayBanGiao']]),
			HienTrang: ps(v[SPA_UFS[131]['HienTrang']]),
			KhoKhan: ps(v[SPA_UFS[131]['KhoKhan']]),
			GiaiPhap: ps(v[SPA_UFS[131]['GiaiPhap']]),
		}

		sql_values.push(`(${ Object.keys(item).map(k=>item[k]) })`)
	})

	const q = `INSERT INTO ${table}
			(Id,Title,CreatedDate,MovedDate,Stage,CompanyID,Responsible,
			NgayTapKet,NgayLapDatHoanThanh,NgayThuMauNoiBo,NgayThuMauAB,NgayBanGiao,HienTrang,KhoKhan,GiaiPhap)
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