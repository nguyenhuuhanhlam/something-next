import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'

export async function POST (req:NextRequest)
{
	return NextResponse.json({ overwrite: true, msg: 'got all invoices' })
}