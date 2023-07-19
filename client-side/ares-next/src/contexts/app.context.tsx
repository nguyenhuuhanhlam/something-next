'use client'

import React, { Dispatch, createContext, useReducer } from 'react'

/* - - - - - */

type LoggedInUserType = {
	id: number,
	token: string,
	username: string
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