interface BlankSpaceProps {
	width: number
}

export const BlankSpace = (props:BlankSpaceProps) => {
	return <span style={{ width:props.width + 'px' }}></span>
}