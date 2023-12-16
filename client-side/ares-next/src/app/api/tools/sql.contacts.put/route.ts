import { NextRequest, NextResponse } from 'next/server'
import excuteQuery from '@/lib/db.ts'
import _ from 'lodash'
import fs from 'fs'

import { CONTACT_UFS } from '@/constants'


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
			Honorific: '"'+ v.HONORIFIC +'"' || 'NULL',
			LastName: v.LAST_NAME ? '"' + v.LAST_NAME + '"' : 'NULL',
			SecondName: v.SECOND_NAME ? '"' + v.SECOND_NAME + '"' : 'NULL',
			Name: v.NAME ? '"' + v.NAME + '"' : 'NULL',
			Phones: '"' + _.map(v.PHONE,'VALUE').join() + '"',
			Emails: '"' + _.map(v.EMAIL,'VALUE').join() + '"',
			Birthdate: v.BIRTHDATE ? '"' + v.BIRTHDATE.slice(0,10) + '"' : 'NULL',
			AssignedByID: v.ASSIGNED_BY_ID || 'NULL',
			CompanyID: v.COMPANY_ID || 'NULL',
			Post: v.POST ? '"' + v.POST + '"' : 'NULL',
			ClientType: v[CONTACT_UFS.ClientType] || 'NULL',
			Account: v[CONTACT_UFS.Account] ? '"' + v[CONTACT_UFS.Account].join() + '"' : 'NULL',
			SupplierType: v[CONTACT_UFS.SupplierType] || 'NULL',
			BusinessSectors: v[CONTACT_UFS.BusinessSectors] || 'NULL',
			Province: v[CONTACT_UFS.Province] || 'NULL',
		}

		sql_values.push(`(${ Object.keys(rebuild).map(k=>rebuild[k]) })`)
	})

	const q = `INSERT INTO contacts(Id,Honorific,LastName,SecondName,Name,Phones,Emails,Birthdate,AssignedByID,CompanyID,Post,ClientType,Account,SupplierType,BusinessSectors,Province) VALUES ${ sql_values.join() }`

	try {
		const del_result = await excuteQuery({ query: 'DELETE FROM contacts' })
		const ins_result = await excuteQuery({
			query: q.replace(/(\r\n|\n|\r|\t)/gm,'')
		})
	} catch (e) {
		console.log(e)
	}

	// fs.writeFile('./public/uploads/contacts.sql',q,err=>{
	// 	if (err) console.log(err)
	// 	else console.log('OK')
	// })

	return NextResponse.json({ overwrite: true })
}