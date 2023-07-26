'use client'

import React, { Dispatch, createContext, useReducer } from 'react'
import axios from 'axios'

import { STRAPI_ENDPOINT } from './store.ts'

/* - - - - - */

type LoggedInUserType = {
	id:number,
	jwt:string,
	username:string,
	email:string
} 

type StateType = {
	loggedInUser:LoggedInUserType
}

type ActionType = { type:string }

/* - - - - - */

const initialState: StateType = {
	loggedInUser: {}
}

/* - - - - - */

const reducer = async (state: StateType, action: ActionType) => {
	switch (action.type) {
		case 'LOGIN':				
				return { ...state, loggedInUser: { username:"OK USER", jwt: 'OK JTW' } }
		default:
			return state
	}
}

/* - - - - - */

export const AppContext = createContext<{ state:StateType, dispatch:Dispatch<ActionType>
}>({ state: initialState, dispatch: () => null })

export const AppContextProvider = ({children}:{children:React.ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	)
}