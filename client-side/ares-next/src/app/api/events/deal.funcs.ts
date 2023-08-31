import excuteQuery from '@/lib/db.ts' 
import { DEAL_UFS } from '@/constants'
const APP_URL = process.env.NEXT_PUBLIC_URL

const getItem = async (id) => {
	const res = await fetch(
		`${APP_URL}/api/btx.crm.deal.get`,
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({ id })
		}
	)

	const json = await res.json()
	const { result } = json

	const rebuild = {
		Id: id,
		Title: result.TITLE,
		Category: Number(result.CATEGORY_ID),
		Stage: result.STAGE_ID,
		CloseDate: result.CLOSEDATE?.slice(0,10) || null,
		CreateDate: result.DATE_CREATE?.slice(0,10) || null,
		Source: result.SOURCE_ID,
		Amount: parseFloat(result.OPPORTUNITY),
		Possible: Number(result[DEAL_UFS['Possible']]),
		SalesObject: result[DEAL_UFS['SalesObject']],
		BusinessSectors: result[DEAL_UFS['BusinessSectors']],
		TargetDate: result[DEAL_UFS['TargetDate']]?.slice(0,10) || null,
		Province: result[DEAL_UFS['Province']],
		LostReasons: result[DEAL_UFS['LostReasons']],
		DeliveryDate: result[DEAL_UFS['DeliveryDate']],
		Responsible: result.ASSIGNED_BY_ID,
		FollowReasons: result[DEAL_UFS['FollowReasons']],
		Company: result.COMPANY_ID
	}

	return rebuild
}

export const updateDeal = async (id) => {
	const item = await getItem(id)
	console.log(item)
}