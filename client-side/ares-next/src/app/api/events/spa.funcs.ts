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

	const rebuild = {
		Id: item.id,
		Title: item.title,
		CongTy: item[UFS[132]['CongTy']],
		Stage: item.stageId,
		CreatedDate: item.createdTime?.slice(0,10) ?? null,
		MovedDate: item.movedTime?.slice(0,10) ?? null,
		NgayBaoCao: item[UFS[132]['NgayBaoCao']]?.slice(0,10) ?? null,
		Responsible: item.assignedById,
		DoanhSoMucTieu: Number(item[UFS[132]['DoanhSoMucTieu']].split('|')[0]),
		DoanhThuMucTieu: Number(item[UFS[132]['DoanhThuMucTieu']].split('|')[0]),
	}

	/*
	'Title' => $this->helper->set($this->Item['title'])->wrap()->get(),
	'CongTy' => $this->Item[Store::$ufs[132]['CongTy']],
	'Stage' => $this->helper->set(Store::$stage[$this->Item['stageId']])->wrap()->get(),
	'CreatedDate' => $this->helper->set($this->Item['createdTime'])->date()->wrap()->get(),
	'MovedDate' => $this->helper->set($this->Item['movedTime'])->date()->wrap()->get(),
	'NgayBaoCao' => $this->helper->set($this->Item[Store::$ufs[132]['NgayBaoCao']])->date()->wrap()->get(),
	'Responsible' => $this->Item['assignedById'],
	'DoanhSoMucTieu' => $this->helper->set($this->Item[Store::$ufs[132]['DoanhSoMucTieu']])->ccy()->get(),
	'DoanhThuMucTieu' => $this->helper->set($this->Item[Store::$ufs[132]['DoanhThuMucTieu']])->ccy()->get(),
	'DinhPhiMucTieu' => $this->helper->set($this->Item[Store::$ufs[132]['DinhPhiMucTieu']])->ccy()->get(),
	'BienPhiMucTieu' => $this->helper->set($this->Item[Store::$ufs[132]['BienPhiMucTieu']])->ccy()->get(),
	'LNMucTieuTruocThue' => $this->helper->set($this->Item[Store::$ufs[132]['LNMucTieuTruocThue']])->ccy()->get(),
	'LNMucTieuSauThue' => $this->helper->set($this->Item[Store::$ufs[132]['LNMucTieuSauThue']])->ccy()->get(),
	'DoanhSoDaDat' => $this->helper->set($this->Item[Store::$ufs[132]['DoanhSoDaDat']])->ccy()->get(),
	'DoanhThuDaDat' => $this->helper->set($this->Item[Store::$ufs[132]['DoanhThuDaDat']])->ccy()->get(),
	'DinhPhiDaChi' => $this->helper->set($this->Item[Store::$ufs[132]['DinhPhiDaChi']])->ccy()->get(),
	'BienPhiDaChi' => $this->helper->set($this->Item[Store::$ufs[132]['BienPhiDaChi']])->ccy()->get(),
	'LNThucTeTruocThue' => $this->helper->set($this->Item[Store::$ufs[132]['LNThucTeTruocThue']])->ccy()->get(),
	'LNThucTeSauThue' => $this->helper->set($this->Item[Store::$ufs[132]['LNThucTeSauThue']])->ccy()->get()
	*/

	return rebuild
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
				await sqlInsert('spa132_125',item)
			break
	}
}

export const updateSPA = async (id, entityTypeId) => {
	const item = await getItem(id, entityTypeId)
	switch (entityTypeId) {
		case 132:
				// await sqlUpdate('spa132_125',item)
			console.log(item)
			break
	}
}

export const deleteSPA = async (id, entityTypeId) => {
	switch (entityTypeId) {
		case 132:
			await sqlDelete('spa132_125', id)
		break
	}
}