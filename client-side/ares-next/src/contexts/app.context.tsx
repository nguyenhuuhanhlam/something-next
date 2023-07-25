'use client'

import React, { Dispatch, createContext, useReducer } from 'react'
//import axios from 'axios'

import { STRAPI_ENDPOINT } from './store.tsx'

/* - - - - - */

type LoggedInUserType = {
	id: number,
	jwt: string,
	username: string,
	email: string
} 

type StateType = {
	count: number,
	loggedInUser: LoggedInUserType
}

type ActionType = { type: string }

/* - - - - - */

const initialState: StateType = {
	count: 0
}

/* - - - - - */

const reducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case 'C1':
			return { ...state, count: state.count + 1 }

		case 'LOGIN':
				const { identifier, password } = action.payload
				//const auth = axios.post(`${STRAPI_ENDPOINT}/api/auth/local`, { identifier, password })

				//console.log(identifier, password)

				//fetch(`${STRAPI_ENDPOINT}/api/auth/local`,{ method: 'POST' })

				return { ...state, loggedInUser: { id:100,token:'this is token',username:'xyz' } }
			break

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