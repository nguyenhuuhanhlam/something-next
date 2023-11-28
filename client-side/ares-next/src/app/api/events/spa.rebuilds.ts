export const rebuilds = (entityTypeId, item=null) =>
{
	let b = {}

	switch (entityTypeId)
	{
		case 132:
			b = {msg:132,item:null}
			break
		case 131:
			b = {msg:131,item}
			break
	}

	return b
}