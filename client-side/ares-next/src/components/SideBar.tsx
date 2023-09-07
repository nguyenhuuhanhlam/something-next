import {
	SidebarComponent,
	TreeViewComponent } from '@syncfusion/ej2-react-navigations'

export const SideBar = (props) => {

	const fields = {
		dataSource: props?.items,
		id: 'id',
		text: 'name',
		child: 'subChild',
		imageUrl: 'image',
		iconCss: 'icon',
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