export const sidemenuData = [
	{ id:'home', name:'HOME' },
	
	{	id:'applinks', name:'APP LINKS',
		subChild:[
			{ id:'applink-ebook', name:'E-Book', image:'/ebook-icon.svg' },
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
		// subChild:[
		// 	{ id:'btx-users', name:'Users' }
		// ]
	},
]