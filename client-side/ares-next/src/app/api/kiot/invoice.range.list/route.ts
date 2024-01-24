import { NextRequest,NextResponse } from 'next/server'
import _ from 'lodash'

export async function POST (req)
{
	const { fromPurchaseDate, toPurchaseDate } = await req.json()
	const res = await fetch(`${ process.env.NEXT_PUBLIC_URL }/api/kiot/token.get`,{ method:'POST' })
	const { access_token } = await res.json()

	const pageSize = 100
	const options = {
		method:'GET',
		headers: {
			'Content-Type':'application/json',
			Retailer:'nhathuockanen',
			Authorization:'Bearer ' + access_token
		}
	}
	const picks = ['code','branchId','branchName','soldById','soldByName','customerCode','customerName','purchaseDate','total','statusValue']

	const dateRange = `fromPurchaseDate=${fromPurchaseDate}&toPurchaseDate=${toPurchaseDate}`
	const response = await fetch(`https://public.kiotapi.com/invoices?pageSize=${pageSize}&${dateRange}`, options)
	const { data,total } = await response.json()

	// 1.
	let all = []
	data.map(v=>{ all.push(_.pick(v, picks)) })

	// 2.
	if (total>pageSize)
	{
		for(let i=1; i<=total/pageSize; i++)
		{
			const response = await fetch(`https://public.kiotapi.com/invoices?pageSize=${pageSize}&${dateRange}&currentItem=${i*pageSize}`, options)
			const { data } = await response.json()

			data.map(v=>{ all.push(_.pick(v, picks)) })
		}
	}

	return NextResponse.json({ invoices:all })
}