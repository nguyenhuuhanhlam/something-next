export type LoggedInUserType = {
	id:number,
	jwt:string,
	username:string,
	email:string
}

export type ActionType = { type:string }

export const LETTER_COLORS = {
	'A': ['Aquamarine','AntiqueWhite','Azure'],
	'B': ['Bisque']
}