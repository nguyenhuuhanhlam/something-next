import excuteQuery from '@/lib/db.ts' 
// import _ from 'lodash'

const getItem = async (id) =>
{
	let res, json

	res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.company.get`,
		{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ id })}
	)

	json = await res.json()
	const { result } = json

	const rebuild = {
		Id: result.ID,
		CompanyName: result.TITLE
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
		console.log('COMPANY ADDED :: ', item.Id)
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
			console.log('COMPANY MISSING :: ADDED :: ', item.Id)
		} else
			console.log('COMPANY UPDATED :: ', item.Id)
	}

	catch (e)
	{
		console.log(e)
	}
}

const sqlDelete = async (table=null, id) =>
{
	const result = await excuteQuery({ query:`DELETE FROM ${table} WHERE Id=${id}` })
	console.log('COMPANY DELETED :: ', id)
}

/* - COMMAND - - - - - - - - */

export const addCOMPANY = async (id) =>
{
	const item = await getItem(id)
	await sqlInsert('companies', item)
}

export const updateCOMPANY = async (id) =>
{
	const item = await getItem(id)
	await sqlUpdate('companies', item)
}

export const deleteCOMPANY = async (id) =>
{
	await sqlDelete('companies', id)
}