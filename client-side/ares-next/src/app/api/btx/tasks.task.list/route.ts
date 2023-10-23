import {
	NextRequest,
	NextResponse
} from 'next/server'

/* - - - - - - - - - - */

export async function POST (req) {
	
	let options = {}
	let all = []

	// 1.
	const res = await fetch(
		`${ process.env['NEXT_PUBLIC_BITRIX_ENDPOINT_13'] }/tasks.task.list`,
		{
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({ ...options })
		}
	)

	const { total, next, result } = await res.json()

	// 2.
	all = all.concat(result)

	return NextResponse.json({ tasks:all })
}

/*
{
                    "id": "83",
                    "parentId": null,
                    "title": "Chủ trì họp định hướng thiết kế",
                    "description": "Chủ trì họp định hướng thiết kế EQ-test",
                    "mark": null,
                    "priority": "1",
                    "multitask": "N",
                    "notViewed": "N",
                    "replicate": "N",
                    "stageId": "0",
                    "createdBy": "31",
                    "createdDate": "2022-04-05T09:43:50+03:00",
                    "responsibleId": "31",
                    "changedBy": "11",
                    "changedDate": "2022-05-03T10:13:06+03:00",
                    "statusChangedBy": "19",
                    "closedBy": "19",
                    "closedDate": "2022-04-05T09:47:42+03:00",
                    "activityDate": "2022-04-05T09:47:42+03:00",
                    "dateStart": null,
                    "deadline": "2022-04-08T05:43:50+03:00",
                    "startDatePlan": null,
                    "endDatePlan": null,
                    "guid": "{15d4c1c8-77bf-453e-93a4-f16c76b70b64}",
                    "xmlId": null,
                    "commentsCount": "1",
                    "serviceCommentsCount": "1",
                    "allowChangeDeadline": "Y",
                    "allowTimeTracking": "Y",
                    "taskControl": "Y",
                    "addInReport": "N",
                    "forkedByTemplateId": null,
                    "timeEstimate": "0",
                    "timeSpentInLogs": null,
                    "matchWorkTime": "N",
                    "forumTopicId": "85",
                    "forumId": "11",
                    "siteId": "s1",
                    "subordinate": "N",
                    "exchangeModified": null,
                    "exchangeId": null,
                    "outlookVersion": "6",
                    "viewedDate": null,
                    "sorting": null,
                    "durationFact": null,
                    "isMuted": "N",
                    "isPinned": "N",
                    "isPinnedInGroup": "N",
                    "descriptionInBbcode": "Y",
                    "status": "5",
                    "statusChangedDate": "2022-04-05T09:47:42+03:00",
                    "durationPlan": null,
                    "durationType": "days",
                    "favorite": "N",
                    "groupId": "0",
                    "auditors": [],
                    "accomplices": [],
                    "newCommentsCount": 0,
                    "group": [],
                    "creator": {
                        "id": "31",
                        "name": "Trí Lê Hữu",
                        "link": "/company/personal/user/31/",
                        "icon": "https://aresen.bitrix24.com/b20600929/resize_cache/61035/c0120a8d7c10d63c83e32398d1ec4d9e/main/0bd/0bd47fd2aa7d54af2615798fcc1e2440/avatar.png",
                        "workPosition": "Phó phòng kinh doanh"
                    },
                    "responsible": {
                        "id": "31",
                        "name": "Trí Lê Hữu",
                        "link": "/company/personal/user/31/",
                        "icon": "https://aresen.bitrix24.com/b20600929/resize_cache/61035/c0120a8d7c10d63c83e32398d1ec4d9e/main/0bd/0bd47fd2aa7d54af2615798fcc1e2440/avatar.png",
                        "workPosition": "Phó phòng kinh doanh"
                    },
                    "accomplicesData": [],
                    "auditorsData": [],
                    "subStatus": "5"
                },
*/