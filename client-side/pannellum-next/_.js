const section = document.querySelector('section')
const closeBtn = document.querySelector('.close-btn')

closeBtn.addEventListener('click', () => section.classList.remove('active'))

// ---
const setInfo = (inf) => {
	const spot_title = document.querySelector('.spot-title')
	const spot_sub = document.querySelector('.spot-sub')
	spot_title.innerHTML = inf?.title
	spot_sub.innerHTML = inf?.sub
}

const removeInfo = () => {}

// ---

var scenes =
{
	F0_1: {
		type:'equirectangular',
		panorama:'uploads/VR360/F0_LOIVAOCHINH/F0_1.jpg',
		hotSpots: [
			{ pitch:-15, yaw:3, type:'scene', sceneId:'F0_2' },
		]
	},
	F0_2: {
		type:'equirectangular',
		panorama:'uploads/VR360/F0_LOIVAOCHINH/F0_2.jpg',
		hotSpots: [
			{ pitch:-40, yaw:2, type:'scene', sceneId:'F0_1' },
			{ pitch:-10, yaw:2, type:'scene', sceneId:'F1_1', text:'VÀO SẢNH CHÍNH' },
		]
		// hotSpots: [
		// 	{ pitch:45, yaw:0, type:'scene', text:'To A', sceneId:'S3' },
		// 	{
		// 		pitch: -20,
		// 		yaw: -10,
		// 		type: 'info',
		// 		clickHandlerFunc: (e) => {
		// 			setInfo({ title:'Hello Spot 1', sub:'Sub Spot 1' })
		// 			section.classList.add('active')
		// 		}
		// 	},
		// 	{
		// 		pitch: -20,
		// 		yaw: -20,
		// 		type: 'info',
		// 		clickHandlerFunc: (e) => {
		// 			setInfo({ title:'Hello Spot 2', sub:'Sub Spot 2' })
		// 			section.classList.add('active')
		// 		}
		// 	}
		// ]
	},
	F1_1: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F1_PANEL/F1_1.jpg',
		// hotSpots: [
		// 	{ pitch:0, yaw:0, type:'scene', text:'To B1', sceneId:'S0' }
		// ]
	}
}

var start =
{
	default: {
		firstScene: 'F0_2',
		sceneFadeDuration: 2000,
		autoLoad: true,
	},
	scenes: scenes
}