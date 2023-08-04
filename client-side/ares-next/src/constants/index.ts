type UserProfile = {
	LastName: string,
	FirstName: string
}

export type LoggedInUserType = {
	id: number,
	jwt: string,
	username: string,
	email: string
}

export type ActionType = { type:string }

export const LETTER_COLORS = {
	'A': ['Aquamarine','AntiqueWhite','Azure'],
	'B': ['Bisque'],
	'C': ['White'],
	'D': ['White'],
	'E': ['White'],
	'F': ['White'],
	'G': ['White'],
	'H': ['White'],
	'I': ['White'],
	'J': ['White'],
	'K': ['White'],
	'L': ['White'],
	'M': ['White'],
	'N': ['White'],
	'O': ['White'],
	'P': ['White'],
	'Q': ['White'],
	'R': ['White'],
	'S': ['White'],
	'T': ['White'],
	'U': ['White'],
	'V': ['White'],
	'W': ['White'],
	'X': ['White'],
	'Y': ['White'],
	'Z': ['White']
}