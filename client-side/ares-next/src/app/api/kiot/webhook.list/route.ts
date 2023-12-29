import { NextRequest,NextResponse } from 'next/server'

export async function POST (req)
{
	const res = await fetch(`${ process.env.NEXT_PUBLIC_URL }/api/kiot/token.get`,{ method:'POST' })
	const { access_token } = await res.json()

	const options = {
		method:'GET',
		headers: {
			Retailer:'nhathuockanen',
			Authorization:'Bearer ' + access_token
		},
	}

	const response = await fetch(`https://public.kiotapi.com/webhooks`, options)
	const { data } = await response.json()

	return NextResponse.json({ webhooks:data })
}