import {
	SidebarComponent,
	TreeViewComponent } from '@syncfusion/ej2-react-navigations'

export const SideBar = (props) => {

	const fields = {
		dataSource: [
			{ id:'home', name:'HOME' },
			
			{	id:'applinks', name:'APP LINKS',
				subChild:[
					{ id:'applinks-ebook', name:'E-Book', image:'/ebook-icon.svg' },
					{ id:'applinks-nas', name:'NAS Synology', image:'/nas-synology-icon.svg'  },
					{ id:'applinks-drive', name:'Drive', image:'/nas-drive-icon.svg' },
					{ id:'applinks-superset', name:'Superset', image:'/superset-icon.svg' },
				]
			},

			{	id:'btx', name:'BITRIX HELPERS',
				subChild:[
					{ id:'btx-users', name:'Users' }
				]
			},
		],

		id:'id', text:'name', child:'subChild', imageUrl:'image'
	}

	return (
		<SidebarComponent
			width={ 248 +'px' }
			target={ props?.target }
			ref={ props?._ref }
			type="Push"
		>
			<div className="pt-5"></div>
			<TreeViewComponent fields={ fields } nodeSelected={ props?.itemOnSelected } />
		</SidebarComponent>
	)
}