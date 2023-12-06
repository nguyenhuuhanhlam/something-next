const section = document.querySelector('section')
const closeBtn = document.querySelector('.close-btn')

closeBtn.addEventListener('click', () => section.classList.remove('active'))

// ---
const path = 'uploads/VR360'
const setInfo = (inf) => {
	const spot_title = document.querySelector('.spot-title')
	const slides = document.querySelector('.swiper-wrapper')

	slides.innerHTML = ''

	spot_title.innerHTML = inf?.title

	inf?.data.map(v=>{
		const div_node = document.createElement('div')
		const img_node = document.createElement('img')
		
		div_node.classList.add('swiper-slide')

		img_node.src=v
		img_node.setAttribute('style','max-width:100%;')
		div_node.appendChild(img_node)

		slides.appendChild(div_node)
	})

	const swiper = document.querySelector('.swiper').swiper
	swiper.update(true)
}

const removeInfo = () => {}

TLS = {
	TL1: [`${path}/F2_TRUNGBAYTRONGNHA/TL1.jpg`],
	TL2: [`${path}/F2_TRUNGBAYTRONGNHA/TL2.jpg`],
	TL3: () => {
		let u = []
		for(var i=1; i<=162; i++) {
			u.push('CT_01_1_734_'+i)
		}
		return u
	}
}

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
			{ pitch:-50, yaw:140, type:'scene', sceneId:'F4', text:'F4' },
			{ pitch:-15, yaw:-67.5, type:'scene', sceneId:'F1_1', text:'RA SẢNH' },
			
			{ pitch:-10, yaw:-37, type:'info', text:'TL1',
				clickHandlerFunc: (e) => {
					setInfo({ title:'TL1', data: TLS.TL1 })
					section.classList.add('active')
				}
			},

			{ pitch:-10, yaw:0, type:'info', text:'TL2',
				clickHandlerFunc: (e) => {
					setInfo({ title:'TL2', data: TLS.TL2 })
					section.classList.add('active')
				}
			},

			{ pitch:-10, yaw:37, type:'info', text:'TL3',
				clickHandlerFunc: (e) => {
					console.log(TLS.TL3())
				}
			},

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
			{ pitch:-30, yaw:-280, type:'scene', sceneId:'F2_1' },
			
			{ pitch:-10, yaw:-25, type:'scene', sceneId:'F5' },
			{ pitch:-10, yaw:7, type:'scene', sceneId:'F6' }
		]
	},

	/* - - - */

	F4: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F4/F4.jpg',
		hotSpots: [
			{ pitch:-20, yaw:75, type:'scene', sceneId:'F2_2' }
		]
	},


	F5: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F5/F5.jpg',
		hotSpots: [
			{ pitch:-20, yaw:-75, type:'scene', sceneId:'F2_2' }
		]
	},

	F6: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F6/F6.jpg',
		hotSpots: [
			{ pitch:-18, yaw:78, type:'scene', sceneId:'F2_2' }
		]
	},

	/* - - - */

	F7: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F7/F7.jpg',
		hotSpots: [
			{ pitch:-40, yaw:0, type:'scene', sceneId:'F7_2', text:'TRỞ VỀ' }
		]
	},

	F7_1: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F7/F7_1.jpg',
		hotSpots: [
			{ pitch:-80, yaw:0, type:'scene', sceneId:'F7_2' }
		]
	},
	F7_2: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F7/F7_2.jpg',
		hotSpots: [
			{ pitch:0, yaw:-42, type:'scene', sceneId:'F1_1', text:'TRỞ VỀ SẢNH' },
			{ pitch:-8, yaw:-10, type:'scene', sceneId:'F7' },
			{ pitch:-10, yaw:0, type:'scene', sceneId:'F8' },
			{ pitch:-15, yaw:-10, type:'scene', sceneId:'F9' }
		]
	},

	/* - - - */

	F8: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F8/F8.jpg',
		hotSpots: [
			{ pitch:-40, yaw:0, type:'scene', sceneId:'F7_2', text:'TRỞ VỀ' }
		]
	},
	F9: {
		type: 'equirectangular',
		panorama: 'uploads/VR360/F9/F9.jpg',
		hotSpots: [
			{ pitch:-40, yaw:0, type:'scene', sceneId:'F7_2', text:'TRỞ VỀ' }
		]
	}
}

var start =
{
	default: {
		firstScene: 'F0_1', /*F0_1*/
		sceneFadeDuration: 1000,
		autoLoad: true,
	},
	scenes: scenes
}