import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/kiot.db'
import { ParseString as ps, ParseDateString as pds } from '@/lib/db.helpers'

export async function POST (req:NextRequest)
{
	const response = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/kiot/invoice.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await response.json()

	let sql_values = []
	json.invoices.map(v => {
		const rebuild = {
			code: ps(v.code),
			branchName: ps(v.branchName),
			soldByName: ps(v.soldByName),
			customerName: ps(v.customerName),
			purchaseDate: pds(v.purchaseDate),
			total: v.total,
			statusValue: ps(v.statusValue)
		}

		sql_values.push(`(${ Object.keys(rebuild).map(k=>rebuild[k]) })`)
	})

	const q = `INSERT INTO invoices(code,branchName,soldByName,customerName,purchaseDate,total,statusValue) VALUES ${sql_values.join()}`

	try {
		const del_result = await excuteQuery({ query:'DELETE FROM invoices' })
		const ins_result = await excuteQuery({
			query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
		})
	} catch (e) {
		console.log(e)
	}

	return NextResponse.json({ overwrite: true })
}