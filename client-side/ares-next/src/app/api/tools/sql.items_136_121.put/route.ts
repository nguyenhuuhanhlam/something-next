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
			// DaChi: 'ufCrm51_1682135615',
			// PhatSinh: 'ufCrm51_1682135644',
			// ConThu: 'ufCrm51_1682135671',
			// ConChi: 'ufCrm51_1682135690',
			// DaDauTu: 'ufCrm51_1682135732',
			// TyLePhaSinhGiaGoc: 'ufCrm51_1682135786',
			// BienPhiDuAn: 'ufCrm51_1682135856',
			// E01QuanLyBaiViet: 'ufCrm51_1702540973'
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

	return NextResponse.json({ overwrite: q })
}