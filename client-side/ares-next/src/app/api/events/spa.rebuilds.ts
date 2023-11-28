export const rebuilds = (entityTypeId, item=null) =>
{
	let b = {}

	switch (entityTypeId)
	{
		case 132:
			b = { spaType:132, data:null }
			break
		case 131:
			b = {
					spaType:131,
					data: {
						Id: item.id,
						Title: item.title,
						CompanyID: item.companyId,
						Stage: item.stageId,
						Responsible: item.assignedById,
					}
			}
			break
	}

	return b
}