import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { STRAPI_ENDPOINT } from '@/contexts/store.ts'

export async function POST (req:NextRequest) {
	const auth = await axios.post(`${STRAPI_ENDPOINT}/api/auth/local`, {})
	//res.status(200).json({hello:'world'})
	return NextResponse.json(auth)
}