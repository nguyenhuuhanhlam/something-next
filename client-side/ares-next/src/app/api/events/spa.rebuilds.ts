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
						CreatedDate: item.createdTime,
						MovedDate: item.movedTime,
						NgayTapKet: item.ufCrm15_1649732702,
						NgayLapDatHoanThanh: item.ufCrm15_1649732751,
						NgayThuMauNoiBo: item.ufCrm15_1649732783,
						NgayThuMauAB: item.ufCrm15_1649732806,
						NgayBanGiao: item.ufCrm15_1649732833
					}
			}
			break
	}

	return b
}