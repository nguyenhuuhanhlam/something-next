export type LoggedInUserType = {
	id:number,
	jwt:string,
	username:string,
	email:string
}

export type ActionType = { type:string }