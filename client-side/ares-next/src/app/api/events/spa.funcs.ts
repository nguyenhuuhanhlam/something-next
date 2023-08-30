import excuteQuery from '@/lib/db.ts' 
import { UFS } from '@/constants'
const APP_URL = process.env.NEXT_PUBLIC_URL

/* - - - - - - - - - - */

const getItem = async (id, entityTypeId) => {
	const res = await fetch(
		APP_URL + '/api/btx.crm.item.get',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, entityTypeId })
		}
	)

	const json = await res.json()
	const { result:{item} } = json

	// console.log('---->',item)

	const rebuild = {
		Id: item.id,
		Title: item.title,
		CongTy: item[UFS[132]['CongTy']],
		Stage: item.stageId,
		CreatedDate: item.createdTime?.slice(0,10) ?? null,
		MovedDate: item.movedTime?.slice(0,10) ?? null,
		NgayBaoCao: item[UFS[132]['NgayBaoCao']]?.slice(0,10) ?? null,
		Responsible: item.assignedById,
		DoanhSoMucTieu: ~~Number(item[UFS[132]['DoanhSoMucTieu']]?.split('|')[0]),
		DoanhThuMucTieu: ~~Number(item[UFS[132]['DoanhThuMucTieu']]?.split('|')[0]),
		DinhPhiMucTieu: ~~Number(item[UFS[132]['DinhPhiMucTieu']]?.split('|')[0]),
		BienPhiMucTieu: ~~Number(item[UFS[132]['BienPhiMucTieu']]?.split('|')[0]),
		LNMucTieuTruocThue: ~~Number(item[UFS[132]['LNMucTieuTruocThue']]?.split('|')[0]),
		LNMucTieuSauThue: ~~Number(item[UFS[132]['LNMucTieuSauThue']]?.split('|')[0]),
		DoanhSoDaDat: ~~Number(item[UFS[132]['DoanhSoDaDat']]?.split('|')[0]),
		DoanhThuDaDat: ~~Number(item[UFS[132]['DoanhThuDaDat']]?.split('|')[0]),
		BienPhiDaChi: ~~Number(item[UFS[132]['BienPhiDaChi']]?.split('|')[0]),
		DinhPhiDaChi: ~~Number(item[UFS[132]['DinhPhiDaChi']]?.split('|')[0]),
		LNThucTeTruocThue: ~~Number(item[UFS[132]['LNThucTeTruocThue']]),
		LNThucTeSauThue: ~~Number(item[UFS[132]['LNThucTeSauThue']])
	}

	return { rebuild, categoryId:item.categoryId }
}

const sqlInsert = async (table=null, item) => {
	const result = await excuteQuery({
		query:
			`INSERT INTO ${table}(${Object.keys(item)}) VALUES(${Object.keys(item).map(k=>'?').join()})`,
		values: Object.values(item)
	})

	if (result?.error) {
		const e = JSON.stringify(result.error)
		console.log(JSON.parse(e).sqlMessage)
	} else
		console.log('ADDED :: ', result)
}

const sqlUpdate = async (table=null, item) => {
	const sets = Object.keys(item).map(k=>k+'=?')

	try {
		const result = await excuteQuery({
			query: `UPDATE ${table} SET ${sets} WHERE id=${item.Id}`,
			values: Object.values(item)
		})

		console.log('UPDATED :: ', result)
	} catch (e) {
		console.log(e)
	}
}

const sqlDelete = async (table=null, id) => {
	const result = await excuteQuery({
		query: `DELETE FROM ${table} WHERE Id=${id}`				
	})
	console.log('DELETED :: ', result)
}

/* - - - - - - - - - - */

export const addSPA = async (id, entityTypeId) => {
	const item = await getItem(id, entityTypeId)
	switch (entityTypeId) {
		case 132:
				switch (item.categoryId) {
					case 125:
							await sqlInsert('spa132_125', item.rebuild)
						break
				}
			break
	}
}

export const updateSPA = async (id, entityTypeId) => {
	const item = await getItem(id, entityTypeId)
	switch (entityTypeId) {
		case 132:
				switch (item.categoryId) {
					case 125:
							await sqlUpdate('spa132_125', item.rebuild)
						break
				}
			break
	}
}

export const deleteSPA = async (id, entityTypeId) => {
	const item = await getItem(id, entityTypeId)
	switch (entityTypeId) {
		case 132:
			switch (item.categoryId) {
					case 125:
							await sqlDelete('spa132_125', id)
						break
				}
		break
	}
}