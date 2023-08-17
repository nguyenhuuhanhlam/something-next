import {
	SidebarComponent,
	TreeViewComponent } from '@syncfusion/ej2-react-navigations'

export const SideBar = (props) => {

	const fields = {
		dataSource: [
			{ id:'home', name:'HOME' },
			
			{	id:'applinks', name:'APP LINKS',
				subChild:[
					{ id:'applinks-ebook', name:'E-Book' },
					{ id:'applinks-nas', name:'NAS Synology' },
					{ id:'applinks-drive', name:'Drive' },
					{ id:'applinks-superset', name:'Superset' },
				]
			},

			{	id:'btx', name:'BITRIX HELPERS',
				subChild:[
					{ id:'btx-users', name:'Users' }
				]
			},
		],

		id:'id', text:'name', child:'subChild'
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