import {
	SidebarComponent,
	TreeViewComponent } from '@syncfusion/ej2-react-navigations'

export const SideBar = (props:NavProps) => {

	return (
		<SidebarComponent
			width={ 248 +'px' }
			target={ props?.target }
			ref={ props?._ref }
			type="Push"
		>
			<TreeViewComponent/>
		</SidebarComponent>
	)
}