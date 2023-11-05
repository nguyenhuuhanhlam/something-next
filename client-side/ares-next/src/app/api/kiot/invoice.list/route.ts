import { NextRequest, NextResponse } from 'next/server'

export async function POST (req) {

	const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/kiot/token.get`,{method:'POST'})
	const { result:{access_token} } = await res.json()

	const invoice_res = await fetch(
		`https://public.kiotapi.com/invoices`,
		{
			method:'GET',
			headers: {
				'Content-Type': 'application/json',
				Retailer:'nhathuockanen',
				Authorization: 'Bearer ' + access_token
			},
		}
	)

  const { data,total } = await invoice_res.json()

  let all = []
  data.map(v => {
  	const { code, branchId, branchName } = v
  	all.push({ code, branchId, branchName })
  })
  
  return NextResponse.json({ result:all, total })
}



/**
 * UTILS
 */
function customerFFilter(item) {
  let reItem = {}
  Object.keys(item).map(k=>{
	 reItem['code'] = item['code']
	 reItem['name'] = item['name']
	 reItem['birthDate'] = item['birthDate']||null
	 reItem['contactNumber'] = item['contactNumber']
	 reItem['totalInvoiced'] = item['totalInvoiced']
  })
  return reItem 
}
function invoiceFFilter(item) {
  let reItem = {}
  Object.keys(item).map(k=>{
	 reItem['code'] = item['code']
	 reItem['branchId'] = item['branchId']
	 reItem['branchName'] = item['branchName']
	 reItem['soldById'] = item['soldById']
	 reItem['soldByName'] = item['soldByName']
	 reItem['customerCode'] = item['customerCode']
	 reItem['customerName'] = item['customerName']
	 reItem['purchaseDate'] = item['purchaseDate']
	 reItem['total'] = item['total']
	 reItem['status'] = item['status']
	 reItem['statusValue'] = item['statusValue']
  })
  return reItem
}
/**
 * REQ FUNCTIONS
 */
function KiotVietGetToken() {
  let o = {
	 method:'post',
	 contentType:'application/x-www-form-urlencoded',
	 payload:{
		client_id:process.env.NEXT_PUBLIC_KIOT_KANEN_CI,
		client_secret:process.env.NEXT_PUBLIC_KIOT_KANEN_CL_SECRET,
		grant_type:'client_credentials',
		scopes:'PublicApi.Access'
	 }
  }
  let r = UrlFetchApp.fetch('https://id.kiotviet.vn/connect/token', o)
  return JSON.parse(r.getContentText()).access_token
}
/**
 * 
 */
function FetchCustomers() {  
  /**
	* 1.
	*/
  let o = {
	 method:'get',
	 headers: {
		Retailer: 'nhathuockanen',
		Authorization: 'Bearer ' + KiotVietGetToken()
	 }
  }
  /**
	* 2.
	*/
  let result = []
  let pageSize = 100 
  let r = UrlFetchApp.fetch(`https://public.kiotapi.com/customers?includeTotal=true&pageSize=${pageSize}&currentItem=0`, o)
  let json = JSON.parse(r.getContentText())
  /**
	*  3.
	*/
  let filteringData = json.data.map(v=>customerFFilter(v))
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Date-Customer')
  sheet.clearContents()
  sheet.getRange(1,1,1,Object.keys(filteringData[0]).length).setValues([Object.keys(filteringData[0])])
  /**
	* 4.
	*/
  result = filteringData.map(v=>Object.values(v))
  /** */

  for(i=1; i<=parseInt(json.total/pageSize); i++) {
	 let r = UrlFetchApp.fetch(`https://public.kiotapi.com/customers?includeTotal=true&pageSize=${pageSize}&currentItem=${i*pageSize}`, o)
	 let json = JSON.parse(r.getContentText())
	 let filteringData = json.data.map(v=>customerFFilter(v))

	 for (let j=0; j<filteringData.length; j++) {
		let item = filteringData[j]
		result.push(Object.values(item))
	 }
  }

  sheet.getRange(2, 1,result.length,Object.keys(filteringData[0]).length).setValues(result)
}
/**
 * 
 */
function FetchInvoices() {
  let options = {method:'get',headers:{Retailer:'nhathuockanen',Authorization:'Bearer '+KiotVietGetToken()}}

  let result = []
  let pageSize = 100 

  let r = UrlFetchApp.fetch(`https://public.kiotapi.com/invoices?pageSize=${pageSize}`,options)
  let json = JSON.parse(r.getContentText())

  //console.log(json)
  //return

  let filteringData = json.data.map(v=>invoiceFFilter(v))

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Date-Invoice')
  sheet.clearContents()
  sheet.getRange(1,1,1,Object.keys(filteringData[0]).length).setValues([Object.keys(filteringData[0])])
  
  result = filteringData.map(v=>Object.values(v))

  for(i=1; i<=parseInt(json.total/pageSize); i++) {
	 let r = UrlFetchApp.fetch(`https://public.kiotapi.com/invoices?pageSize=${pageSize}&currentItem=${i*pageSize}`,options)
	 let json = JSON.parse(r.getContentText())
	 let filteringData = json.data.map(v=>invoiceFFilter(v))

	 for (let j=0; j<filteringData.length; j++) {
		let item = filteringData[j]
		result.push(Object.values(item))
	 }
  }

  sheet.getRange(2, 1,result.length,Object.keys(filteringData[0]).length).setValues(result)
}