export const Avatar = (props) => {
	const letter = props.item.substring(0,1).toUpperCase()

	return (
		<div
			className="e-avatar e-avatar-xsmall e-avatar-circle"
			style={{
				backgroundColor: props.palette[letter][0],
				color: 'black',
				marginLeft: 8 +'px'
			}}
			onClick={ props.itemOnClick }
		>
		{ letter }	
		</div>
	)
}