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
			{ pitch:-24, yaw:-4, type:'scene', text:'thong tin buc tranh ABC', sceneId:'S0' }
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
		firstScene: 'S0',
		sceneFadeDuration: 3000,
		autoLoad: true,
		compass: false,
		hotSpotDebug: true,
	},
	scenes: scenes
}