import { NextRequest, NextResponse } from 'next/server'

export async function POST (req)
{
	// const form = await req.formData()
	// const params = Object.fromEntries(form)
	
	console.log(await req.json())

	return NextResponse.json({ event:'invoice-update' })
}