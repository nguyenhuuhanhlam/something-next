import {
	NextRequest,
	NextResponse } from 'next/server'
import fs from 'fs'

export async function POST (req) {
	return NextResponse.json({ result:true })
}