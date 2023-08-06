type LetterColor = { name: string }

interface AvatarProps {
	palette: { [key: string]: LetterColor },
	item: string,
	itemOnClick: ()=>void
}

export const Avatar = (props:AvatarProps) => {
	const letter = props.item.substring(0,1).toUpperCase()

	return (
		<span
			className="e-avatar e-avatar-xsmall e-avatar-circle"
			style={{
				backgroundColor: props.palette[letter][0],
				color: 'black',
				marginLeft: 8 +'px'
			}}
			onClick={ props.itemOnClick }
		>
		{ letter }	
		</span>
	)
}