import { NextRequest, NextResponse } from 'next/server'

export async function POST (req)
{
	try {
		const form = await req.formData()
		const params = Object.fromEntries(form)

		console.log('HOOKS :: ',params)
	} catch(e) {
		console.log(e)
	}

	return NextResponse.json({ events:true })
}