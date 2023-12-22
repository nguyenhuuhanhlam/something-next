import excuteQuery from '@/lib/db.ts' 
import _ from 'lodash'

const getItem = async (id) =>
{
	
}

/* - COMMAND - - - - - - - - */

export const addCOMPANY = async (id) => {
	const item = await getItem(id)
	// await sqlInsert('companies', item)
}

export const updateCOMPANY = async (id) => {
	const item = await getItem(id)
	// await sqlUpdate('companies', item)
}

export const deleteCOMPANY = async (id) => {
	// await sqlDelete('companies', id)
}