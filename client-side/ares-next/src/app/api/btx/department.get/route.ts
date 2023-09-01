import { NextRequest, NextResponse } from 'next/server'

export async function POST (req) {
	
	const BITRIX_ENDPOINT = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_13']

	const res = await fetch(`${ BITRIX_ENDPOINT }/department.get`)
	const { result } = await res.json()

	return NextResponse.json({ departmentList:result })
}