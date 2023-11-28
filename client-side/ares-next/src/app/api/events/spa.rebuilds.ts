export const rebuilds = (entityTypeId, item=null) =>
{
	let b = {}

	switch (entityTypeId)
	{
		case 132:
			b = {spaType:132, data:null}
			break
		case 131:
			b = {spaType:131, data:{
				Id: item.id,
				Title: item.Title,
				CompanyID: item.companyId
			}}
			break
	}

	return b
}