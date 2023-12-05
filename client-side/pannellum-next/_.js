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
		panorama: 'uploads/VR360/F1_PANEL/F1_1.jpg',
		title:'SẢNH',
		hotSpots: [
			{ pitch:-20, yaw:-66, type:'scene', text:'KHU TRƯNG BÀY TRONG NHÀ', sceneId:'F2_1' },
			{ pitch:-20, yaw:60, type:'scene', text:'KHU TRƯNG BÀY NGOÀI TRỜI', sceneId:'F7_1' },
			{ pitch:-140, yaw:20, type:'scene', sceneId:'F0_2' } /* RA NGOAI */
		]
	},

	/* - - - */

	F2_1: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F2-F6_TRUNGBAYTRONGNHA/F2_TL01-TL03/F2_1.jpg',
		hotSpots: [
			{ pitch:0, yaw:240, type:'scene', sceneId:'F2_2' },
			{ pitch:-15, yaw:-67.5, type:'scene', sceneId:'F1_1', text:'RA SẢNH' }
		]
	},
	F2_2: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F2-F6_TRUNGBAYTRONGNHA/F2_TL01-TL03/F2_2.jpg',
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
		sceneFadeDuration: 2000,
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