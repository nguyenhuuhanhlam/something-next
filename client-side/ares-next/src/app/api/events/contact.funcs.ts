import excuteQuery from '@/lib/db.ts' 
import { CONTACT_UFS } from '@/constants'
import _ from 'lodash'

const getItem = async (id) => {
	let res, json

	res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.contact.get`,
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({ id })
		}
	)

	json = await res.json()
	const { result } = json

	const rebuild = {
		Id: ~~Number(result.ID),
		Honorific: result.HONORIFIC || null,
		LastName: result.LAST_NAME || null,
		SecondName: result.SECOND_NAME || null,
		Name: result.NAME || null,
		Phones: _.map(result.PHONE,'VALUE').join(),
		Emails: _.map(result.EMAIL,'VALUE').join(),
		Birthdate: result.BIRTHDATE?.slice(0,10) || null,
		AssignedByID: ~~Number(result.ASSIGNED_BY_ID) || null,
		CompanyID: ~~Number(result.COMPANY_ID) || null,
		Post: result.POST || null,
		ClientType: ~~Number(result[CONTACT_UFS.ClientType]) || null,
		Account: result[CONTACT_UFS.Account] || null,
		SupplierType: ~~Number(result[CONTACT_UFS.SupplierType]) || null,
		BusinessSectors: ~~Number(result[CONTACT_UFS.BusinessSectors]) || null,
		Province: ~~Number(result[CONTACT_UFS.Province]) || null
	}

	return rebuild
}

/* - SQL - - - - - - - - */

const sqlInsert = async (table=null, item) =>
{
	const result = await excuteQuery({
		query: `INSERT INTO ${table}(${Object.keys(item)}) VALUES(${Object.keys(item).map(k=>'?').join()})`,
		values: Object.values(item)
	})

	if (result?.error)
	{
		const e = JSON.stringify(result.error)
		console.log(JSON.parse(e).sqlMessage)
	} else
		console.log('CONTACT ADDED :: ', item.Id)
}

const sqlUpdate = async (table=null, item) =>
{
	const sets = Object.keys(item).map(k=>k+'=?')

	try
	{
		const result = await excuteQuery({ query:`UPDATE ${table} SET ${sets} WHERE id=${item.Id}`, values:Object.values(item) })

		if (result.affectedRows==0)
		{
			await sqlInsert('tasks', item)
			console.log('CONTACT MISSING :: ADDED :: ', item.Id)
		} else
			console.log('CONTACT UPDATED :: ', item.Id)
	}

	catch (e)
	{
		console.log(e)
	}
}

const sqlDelete = async (table=null, id) =>
{
	const result = await excuteQuery({ query:`DELETE FROM ${table} WHERE Id=${id}` })
	console.log('CONTACT DELETED :: ', id)
}

/* - COMMAND - - - - - - - - */

export const addCONTACT = async (id) => {
	const item = await getItem(id)
	await sqlInsert('contacts', item)
}

export const updateCONTACT = async (id) => {
	const item = await getItem(id)
	await sqlUpdate('contacts', item)
}

export const deleteCONTACT = async (id) => {
	await sqlDelete('contacts', id)
}