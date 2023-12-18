import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/db'
import {
	ParseString as ps,
	ParseDateString as pds,
	ParseCurrencyToInt as pci
} from '@/lib/db.helpers'
import { SPA_UFS } from '@/constants'

export async function POST (req:NextRequest)
{
	const table = 'spa_136_121'
	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.item_136_121.list`, {
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
			Responsible: v.assignedById || 'NULL',

			NgayKyHopDong: pds(v[SPA_UFS[136]['NgayKyHopDong']]),
			GiaTriHopDong: pci(v[SPA_UFS[136]['GiaTriHopDong']]),
			GiaGocPheDuyet: pci(v[SPA_UFS[136]['GiaGocPheDuyet']]),
			DaThu: pci(v[SPA_UFS[136]['DaThu']]),
			DaChi: pci(v[SPA_UFS[136]['DaChi']]),
			PhatSinh: pci(v[SPA_UFS[136]['PhatSinh']]),
			ConThu: pci(v[SPA_UFS[136]['ConThu']]),
			ConChi: pci(v[SPA_UFS[136]['ConChi']]),
			DaDauTu: pci(v[SPA_UFS[136]['DaDauTu']]),
			TyLePhaSinhGiaGoc: v[SPA_UFS[136]['TyLePhaSinhGiaGoc']],
			BienPhiDuAn: v[SPA_UFS[136]['BienPhiDuAn']],
			E01QuanLyBaiViet: v[SPA_UFS[136]['E01QuanLyBaiViet']] || 'NULL'
		}

		sql_values.push(`(${ Object.keys(item).map(k=>item[k]) })`)
	})

	const q = `INSERT INTO ${table}
			(Id, Title, CreatedDate, MovedDate, Stage, Responsible,
			)
		VALUES ${sql_values.join()}`

	// try {
	// 	const del_result = await excuteQuery({ query: `DELETE FROM ${table}` })
	// 	const ins_result = await excuteQuery({
	// 		query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
	// 	})
	// } catch (e) {
	// 	console.log(e)
	// }

	return NextResponse.json({ overwrite: sql_values[0] })
}

// M25397150904379