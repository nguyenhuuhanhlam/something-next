interface BlankSpaceProps {
	space: number,
	vh: number
}

export const BlankSpace = (props:BlankSpaceProps) => {
	if (props.vh!=1)
		return <span style={{ display: 'block', width:props.space + 'px' }}></span>
	else
		return <span style={{ display: 'block', height:props.space + 'px' }}></span>
}