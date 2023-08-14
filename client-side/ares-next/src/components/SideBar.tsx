import {
	SidebarComponent,
	TreeViewComponent } from '@syncfusion/ej2-react-navigations'

export const SideBar = (props:NavProps) => {

	return (
		<SidebarComponent
			width={ 60 +'px' }
			target={ props.target }
		>
			<TreeViewComponent/>
		</SidebarComponent>
	)
}