import { NextRequest, NextResponse } from 'next/server'
import { CONTACT_UFS } from '@/constants'

export async function POST (req)
{
	const endpoint = process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_11']
	const opt = {
		select: [
			'ID',
			'HONORIFIC',
			'LAST_NAME',
			'SECOND_NAME',
			'NAME',
			'PHONE',
			'EMAIL',
			'BIRTHDATE',
			'COMPANY_ID',
			'POST',
			CONTACT_UFS.ClientType,
			CONTACT_UFS.Account,
			CONTACT_UFS.SupplierType,
			CONTACT_UFS.BusinessSectors,
			CONTACT_UFS.Province,
		]
	}
	const response = await fetch(
		`${ endpoint }/crm.contact.list`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...opt })
		})
	const { total, next, result } = await response.json()

	// * * * * *
	let all = []
	all = all.concat(result)

	return NextResponse.json({ total, contacts: all })
}
