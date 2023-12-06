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
			{ pitch:-15, yaw:3, type:'scene', sceneId:'F0_2', scale:10 },
		]
	},
	F0_2: {
		type:'equirectangular',
		panorama:'uploads/VR360/F0_LOIVAOCHINH/F0_2.jpg',
		hotSpots: [
			{ pitch:-40, yaw:2, type:'scene', sceneId:'F0_1' },
			{ pitch:-10, yaw:2, type:'scene', sceneId:'F1_1', text:'VÀO SẢNH CHÍNH' },
		]
	},

	/* - - - */

	F1_1: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F1_SANH/F1_1.jpg',
		title:'SẢNH',
		hotSpots: [
			{ pitch:-20, yaw:-66, type:'scene', text:'KHU TRƯNG BÀY TRONG NHÀ', sceneId:'F2_1' },
			{ pitch:-20, yaw:60, type:'scene', text:'KHU TRƯNG BÀY NGOÀI TRỜI', sceneId:'F7_1' },
			{ pitch:-140, yaw:20, type:'scene', sceneId:'F0_2' } /* RA NGOAI */
		]
	},

	/* - TRONG NHA - */

	F2_1: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F2_TRUNGBAYTRONGNHA/F2_1.jpg',
		hotSpots: [
			{ pitch:0, yaw:240, type:'scene', sceneId:'F2_2' },
			{ pitch:-15, yaw:-67.5, type:'scene', sceneId:'F1_1', text:'RA SẢNH' },
			{ pitch:-10, yaw:-37, type:'info', text:'TL1' },
			{ pitch:-10, yaw:0, type:'info', text:'TL2' },
			{ pitch:-10, yaw:37, type:'info', text:'TL3' },
			{ pitch:-8.5, yaw:70, type:'info', text:'TL4' },
			{ pitch:-7.5, yaw:98.5, type:'info', text:'TL5' },
			{ pitch:-6.5, yaw:123, type:'info', text:'TL6' },
			{ pitch:-6, yaw:146, type:'info', text:'TL7' },
		]
	},
	F2_2: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F2_TRUNGBAYTRONGNHA/F2_2.jpg',
		hotSpots: [
			{ pitch:-30, yaw:-280, type:'scene', sceneId:'F2_1' }
		]
	},

	/* - - - */

	F7_1: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F7_F9/F7_1.jpg',
		hotSpots: [
			{ pitch:-80, yaw:0, type:'scene', sceneId:'F7_2' }
		]
	},
	F7_2: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F7_F9/F7_2.jpg',
		hotSpots: [
			{ pitch:0, yaw:-42, type:'scene', sceneId:'F1_1', text:'TRỞ VỀ SẢNH' }
		]
	}
}

var start =
{
	default: {
		firstScene: 'F2_1', /*F0_1*/
		sceneFadeDuration: 1000,
		autoLoad: true,
	},
	scenes: scenes
}

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