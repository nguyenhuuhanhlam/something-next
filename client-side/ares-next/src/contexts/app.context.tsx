'use client'

import React, { Dispatch, createContext, useReducer } from 'react'
import axios from 'axios'

import { LoggedInUserType, ActionType } from '@/constants'
// import { STRAPI_ENDPOINT } from './store'

/* - - - - - */

type StateType = {
	loggedInUser:LoggedInUserType
}

/* - - - - - */

const initialState:StateType = {
	loggedInUser: {}
}

/* - - - - - */

const reducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case 'LOGIN':
				const { user:{username}, jwt } = action.payload
				return { ...state, loggedInUser: { jwt, username }}
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