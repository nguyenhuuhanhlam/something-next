import excuteQuery from '@/lib/db.ts'

const getItem = async (id) => {
	const res = await fetch(
		`${ process.env.NEXT_PUBLIC_URL }/api/btx/task.item.getdata`,
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({ id })
		}
	)

    const json = await res.json()
    const { result:{item} } = json

    const rebuild = {
        Id: id,
        Title: item.TITLE
    }

    return rebuild
}

/* - SQL - - - - - - - - */

/* - ACTIONS - - - - - - - - */

export const updateTASK = async (id) => {
	const item = await getItem(id)
    console.log(item)
	// await sqlUpdate('leads', item)
}

/*
{
    "result": {
        "TITLE": "Hoàn thành OKR và kế hoạch OKR quý 4",
        "STAGE_ID": "0",
        "DESCRIPTION": "Thiết lập OKR với các mục tiêu đã được định hướng\r\nTrong từng mục tiêu then chốt, có các hoạt động nhỏ để hoàn thành mục tiêu.\r\n",
        "DEADLINE": "2023-10-26T13:30:00+03:00",
        "START_DATE_PLAN": "",
        "END_DATE_PLAN": "",
        "PRIORITY": "1",
        "ACCOMPLICES": [],
        "AUDITORS": [],
        "TAGS": [],
        "ALLOW_CHANGE_DEADLINE": "Y",
        "TASK_CONTROL": "Y",
        "PARENT_ID": "0",
        "DEPENDS_ON": [],
        "GROUP_ID": "113",
        "RESPONSIBLE_ID": "127",
        "TIME_ESTIMATE": "0",
        "ID": "18109",
        "CREATED_BY": "127",
        "DESCRIPTION_IN_BBCODE": "Y",
        "DECLINE_REASON": "",
        "REAL_STATUS": "5",
        "STATUS": "5",
        "RESPONSIBLE_NAME": "Nhi",
        "RESPONSIBLE_LAST_NAME": "Dương Thị Uyển",
        "RESPONSIBLE_SECOND_NAME": "",
        "DATE_START": "",
        "DURATION_FACT": null,
        "DURATION_PLAN": null,
        "DURATION_TYPE": "days",
        "CREATED_BY_NAME": "Nhi",
        "CREATED_BY_LAST_NAME": "Dương Thị Uyển",
        "CREATED_BY_SECOND_NAME": "",
        "CREATED_DATE": "2023-10-24T03:59:27+03:00",
        "CHANGED_BY": "127",
        "CHANGED_DATE": "2023-10-26T10:54:49+03:00",
        "STATUS_CHANGED_BY": "127",
        "STATUS_CHANGED_DATE": "2023-10-26T10:54:49+03:00",
        "CLOSED_BY": "127",
        "CLOSED_DATE": "2023-10-26T10:54:49+03:00",
        "ACTIVITY_DATE": "2023-10-26T10:54:49+03:00",
        "GUID": "{886b8a23-d9d9-4916-bd82-2e59384e0e21}",
        "MARK": null,
        "VIEWED_DATE": "",
        "TIME_SPENT_IN_LOGS": null,
        "FAVORITE": "N",
        "ALLOW_TIME_TRACKING": "N",
        "MATCH_WORK_TIME": "N",
        "ADD_IN_REPORT": "N",
        "FORUM_ID": "11",
        "FORUM_TOPIC_ID": "17597",
        "COMMENTS_COUNT": "3",
        "SITE_ID": "s1",
        "SUBORDINATE": "N",
        "FORKED_BY_TEMPLATE_ID": null,
        "MULTITASK": "N",
        "SCENARIO_NAME": [
            "default"
        ],
        "UF_CRM_TASK": false,
        "UF_MAIL_MESSAGE": null
    },
    "time": {
        "start": 1698307741.5873129,
        "finish": 1698307741.820473,
        "duration": 0.23316001892089844,
        "processing": 0.09325718879699707,
        "date_start": "2023-10-26T11:09:01+03:00",
        "date_finish": "2023-10-26T11:09:01+03:00",
        "operating_reset_at": 1698308341,
        "operating": 0
    }
}
*/