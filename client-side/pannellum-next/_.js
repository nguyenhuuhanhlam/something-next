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
	S0: {
		title:'coords-helper',
		type:'equirectangular',
		panorama:'uploads/coords-helper.jpg',
		hotSpots: [
			{ pitch:-30, yaw:0, type:'scene', text:'To L1', sceneId:'S2' },
		]
	},
	S2: {
		title:'BedRoom',
		type:'equirectangular',
		panorama:'uploads/bedroom.jpg',
		hotSpots: [
			{ pitch:45, yaw:0, type:'scene', text:'To A', sceneId:'S3' },
			{
				pitch: -20,
				yaw: -10,
				type: 'info',
				clickHandlerFunc: (e) => {
					setInfo({ title:'Hello Spot 1', sub:'Sub Spot 1' })
					section.classList.add('active')
				}
			},
			{
				pitch: -20,
				yaw: -20,
				type: 'info',
				clickHandlerFunc: (e) => {
					setInfo({ title:'Hello Spot 2', sub:'Sub Spot 2' })
					section.classList.add('active')
				}
			}
		]
	},
	S3: {
		title:'Library',
		type: 'equirectangular',
		panorama: 'uploads/library.jpg',
		hotSpots: [
			{ pitch:0, yaw:0, type:'scene', text:'To B1', sceneId:'S0' }
		]
	}
}

var start =
{
	default: {
		firstScene: 'S2',
		sceneFadeDuration: 3000,
		autoLoad: true,
	},
	scenes: scenes
}