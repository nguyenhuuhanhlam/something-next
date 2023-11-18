import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'
import { HONORIFICS, CONTACT_UFS } from '@/constants'
import _ from 'lodash'

export async function POST (req:NextRequest)
{
	const response = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/crm.contact.list`, {
			method:'POST',
			headers:{ 'Content-Type':'application/json' }
		}
	)

	const json = await response.json()

	let sql_values = []

	json.contacts.map(v => {
		const rebuild = {
			Id: v.ID,
			Honorific: HONORIFICS[v.HONORIFIC],
			LastName: v.LAST_NAME,
			SecondName: v.SECOND_NAME,
			Name: v.NAME,
			Phones: _.map(v.PHONE,'VALUE').join(),
			Emails: _.map(v.EMAIL,'VALUE').join(),
			Birthday: v.BIRTHDATE,
			CompanyID: v.COMPANY_ID,
			Post: v.POST,
			ClientType: v[CONTACT_UFS.ClientType],
			Account: v[CONTACT_UFS.Account],
			SupplierType: v[CONTACT_UFS.SupplierType],
			BusinessSectors: v[CONTACT_UFS.BusinessSectors],
			Province: v[CONTACT_UFS.Province],
		}

		sql_values.push(`(${ Object.keys(rebuild).map(k=>rebuild[k]) })`)
	})

	return NextResponse.json({ overwrite: sql_values })
}