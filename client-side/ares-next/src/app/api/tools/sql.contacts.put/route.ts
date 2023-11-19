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
			LastName: v.LAST_NAME ? '"' + v.LAST_NAME + '"' : 'NULL',
			SecondName: v.SECOND_NAME ? '"' + v.SECOND_NAME + '"' : 'NULL',
			Name: v.NAME ? '"' + v.NAME + '"' : 'NULL',
			Phones: '"' + _.map(v.PHONE,'VALUE').join() + '"',
			Emails: '"' + _.map(v.EMAIL,'VALUE').join() + '"',
			Birthdate: v.BIRTHDATE ? '"' + v.BIRTHDATE.slice(0,10) + '"' : 'NULL',
			CompanyID: v.COMPANY_ID,
			Post: v.POST ? '"' + v.POST + '"' : 'NULL',
			ClientType: v[CONTACT_UFS.ClientType],
			Account: v[CONTACT_UFS.Account] ? '"' + v[CONTACT_UFS.Account].join() + '"' : 'NULL',
			SupplierType: v[CONTACT_UFS.SupplierType] || 'NULL',
			BusinessSectors: v[CONTACT_UFS.BusinessSectors],
			Province: v[CONTACT_UFS.Province],
		}

		sql_values.push(`(${ Object.keys(rebuild).map(k=>rebuild[k]) })`)
	})

	const q = `INSERT INTO contacts(Id,Honorific,LastName,SecondName,Name,Phones,Emails,Birthdate,CompanyID,Post,ClientType,Account,SupplierType,BusinessSectors,Province) VALUES ${ sql_values.join() }`

	try {
		const del_result = await excuteQuery({ query: 'DELETE FROM contacts' })
		const ins_result = await excuteQuery({
			query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
		})
	} catch (e) {
		console.log(e)
	}

	return NextResponse.json({ overwrite: true })
}