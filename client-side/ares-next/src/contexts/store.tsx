export const appConfig = {
	title: 'LAB.X V1.1',
	viewport: 'width=device-width, initial-scale=1.0, maximum-scale = 1.0'
}

export const sidemenuData = [
	{ id:'home', name:'HOME' },
	
	// {	id:'applinks', name:'APP LINKS',
	// 	subChild:[
	// 		{ id:'applink-ebook', name:'E-Book', image:'/ebook-icon.svg', navigateUrl:'http://ebook.aresen.vn:8088' },
	// 		{ id:'applink-nas', name:'NAS Synology', image:'/nas-synology-icon.svg', navigateUrl:'http://cloud.aresen.vn' },
	// 		{ id:'applink-drive', name:'Drive', image:'/nas-drive-icon.svg', navigateUrl:'http://drive.aresen.vn' },
	// 		{ id:'applink-superset', name:'Superset', image:'/superset-icon.svg', navigateUrl:'http://115.75.90.30:8888' },
	// 		{ id:'applink-bitrix', name:'Bitrix24', image:'/bitrix24-icon.svg', navigateUrl:'https://aresen.bitrix24.com' },
	// 		{ id:'applink-miro', name:'Miro', image:'/miro-icon.svg', navigateUrl:'https://miro.com' },
	// 	]
	// },

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