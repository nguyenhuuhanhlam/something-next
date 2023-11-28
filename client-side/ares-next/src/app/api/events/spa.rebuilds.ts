export const rebuilds = (entityTypeId, item=null) =>
{
	let b = {}

	switch (entityTypeId)
	{
		case 132:
			b = {
				Id: item.id,
				Title: item.title,
				__categoryId: item.categoryId,
			}
			break
		case 131:
			b = {
				Id: item.id,
				Title: item.title,
				__categoryId: item.categoryId,
				CompanyID: item.companyId,
				Stage: item.stageId,
				Responsible: item.assignedById,
				CreatedDate: item.createdTime?.slice(0,10) || null,
				MovedDate: item.movedTime?.slice(0,10) || null,
				NgayTapKet: item.ufCrm15_1649732702?.slice(0,10) || null,
				NgayLapDatHoanThanh: item.ufCrm15_1649732751?.slice(0,10) || null,
				NgayThuMauNoiBo: item.ufCrm15_1649732783?.slice(0,10) || null,
				NgayThuMauAB: item.ufCrm15_1649732806?.slice(0,10) || null,
				NgayBanGiao: item.ufCrm15_1649732833?.slice(0,10) || null
			}
			break
	}

	return b
}