export const appConfig = {
	title: 'LAB.X V1.1',
	viewport: 'width=device-width, initial-scale=1.0, maximum-scale = 1.0'
}

export const sidemenuData = [
	{ id:'home', name:'HOME', tooltip:'heloo there' },
	
	{	id:'applinks', name:'APP LINKS',
		subChild:[
			{ id:'applink-ebook', name:'E-Book', image:'/ebook-icon.svg'},
			{ id:'applink-nas', name:'NAS Synology', image:'/nas-synology-icon.svg'  },
			{ id:'applink-drive', name:'Drive', image:'/nas-drive-icon.svg' },
			{ id:'applink-superset', name:'Superset', image:'/superset-icon.svg' },
			{ id:'applink-bitrix', name:'Bitrix24', image:'/bitrix24-icon.svg' },
		]
	},

	{	id:'btx', name:'BITRIX HELPERS',
		subChild:[
			{ id:'btx-users', name:'Users' }
		]
	},

	{	id:'kiot', name:'KIOT HELPERS',
		subChild:[
			{ id:'kiot-hooks', name:'Hooks' }
		]
	},
]