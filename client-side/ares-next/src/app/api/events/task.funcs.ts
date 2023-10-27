import excuteQuery from '@/lib/db.ts'

const getItem = async (id) => {
	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/task.item.getdata`,
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({ TASKID:id })
		}
	)

    const json = await res.json()
    const { result } = json

    const rebuild = {
        Id: id,
        Title: result.TITLE,
        Status: parseInt(result.STATUS),
        Responsible: parseInt(result.GROUP_ID),
        Deadline: result.DEADLINE?.slice(0,10) || null,
        CreatedBy: parseInt(result.CREATED_BY),
        ClosedBy: parseInt(result.CLOSED_BY),
        CreatedDate: result.CREATED_DATE?.slice(0,10) || null,
        CloseDate: result.CLOSED_DATE?.slice(0,10) || null
    }

    return rebuild
}

/* - SQL - - - - - - - - */
const sqlUpdate = async (table=null, item) => {
    const sets = Object.keys(item).map(k=>k+'=?')
}

/* - ACTIONS - - - - - - - - */

export const updateTASK = async (id) => {

    const item = await getItem(id)
    console.log('update task for :', item)
	await sqlUpdate('tasks', item)
}