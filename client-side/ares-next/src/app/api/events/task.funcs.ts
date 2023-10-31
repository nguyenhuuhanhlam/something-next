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
        Title: result.TITLE.replace(/[\r\n\t\"]/g, "|"),
        Status: parseInt(result.STATUS),
        Responsible: parseInt(result.RESPONSIBLE_ID),
        Deadline: result.DEADLINE?.slice(0,10) || null,
        CreatedBy: parseInt(result.CREATED_BY),
        ClosedBy: result.CLOSED_BY ? parseInt(result.CLOSED_BY) : null,
        CreatedDate: result.CREATED_DATE?.slice(0,10) || null,
        ClosedDate: result.CLOSED_DATE?.slice(0,10) || null
    }

    return rebuild
}

/* - SQL - - - - - - - - */
const sqlInsert = async (table=null, item) => {
    const result = await excuteQuery({
        query:
            `INSERT INTO ${table}(${Object.keys(item)}) VALUES(${Object.keys(item).map(k=>'?').join()})`,
        values: Object.values(item)
    })

    if (result?.error) {
        const e = JSON.stringify(result.error)
        console.log(JSON.parse(e).sqlMessage)
    } else
        console.log('TASK ADDED :: ', item.Id)
}

const sqlUpdate = async (table=null, item) => {
    const sets = Object.keys(item).map(k=>k+'=?')

    try {
        
        const result = await excuteQuery({
            query: `UPDATE ${table} SET ${sets} WHERE id=${item.Id}`,
            values: Object.values(item)
        })

        if (result.affectedRows==0) {
            await sqlInsert('tasks', item)
            console.log('TASK MISSING :: ADDED :: ', item.Id)
        } else
            console.log('TASK UPDATED :: ', item.Id)

    } catch (e) {
        console.log(e)
    }
}

const sqlDelete = async (table=null, id) => {
    const result = await excuteQuery({
        query: `DELETE FROM ${table} WHERE Id=${id}`                
    })
    console.log('TASK DELETED :: ', id)
}

/* - ACTIONS - - - - - - - - */

export const addTASK = async (id) => {
    const item = await getItem(id)
    await sqlInsert('tasks', item)
}

export const updateTASK = async (id) => {
    const item = await getItem(id)
	await sqlUpdate('tasks', item)
}

export const deleteTASK = async (id) => {
    await sqlDelete('tasks', id)
}

