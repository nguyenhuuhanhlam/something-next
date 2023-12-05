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
				CongTy: item.ufCrm19_1665394136,
				Stage: item.stageId,
				CreatedDate: item.createdTime?.slice(0,10) || null,
				MovedDate: item.movedTime?.slice(0,10) || null,
				NgayBaoCao: item.ufCrm19_1685433699?.slice(0,10) || null,
				Responsible: item.assignedById,
				DoanhSoMucTieu: ~~Number(item.ufCrm19_1685433719?.split('|')[0]),
				DoanhThuMucTieu: ~~Number(ufCrm19_1685433737?.split('|')[0]),
				DinhPhiMucTieu: ~~Number(ufCrm19_1685433842?.split('|')[0]),
				BienPhiMucTieu: ~~Number(ufCrm19_1685433870?.split('|')[0]),
				LNMucTieuTruocThue: ~~Number(ufCrm19_1685434101?.split('|')[0]),
				LNMucTieuSauThue: ~~Number(ufCrm19_1685434141?.split('|')[0]),
				DoanhSoDaDat: ~~Number(item.ufCrm19_1685434301?.split('|')[0]),
				DoanhThuDaDat: ~~Number(item.ufCrm19_1685434345?.split('|')[0]),
				DinhPhiDaChi: ~~Number(item.ufCrm19_1685434365?.split('|')[0]),
				BienPhiDaChi: ~~Number(item.ufCrm19_1685434545?.split('|')[0]),
				LNThucTeTruocThue: ~~Number(item.ufCrm19_1686714238?.split('|')[0]),
				LNThucTeSauThue: ~~Number(item.ufCrm19_1686714444?.split('|')[0])
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
				NgayBanGiao: item.ufCrm15_1649732833?.slice(0,10) || null,
				HienTrang: item.ufCrm15_1701160271 || null,
				KhoKhan: item.ufCrm15_1701160292 || null,
				GiaiPhap: item.ufCrm15_1701160343 || null,
			}
			break
	}

	return b
}