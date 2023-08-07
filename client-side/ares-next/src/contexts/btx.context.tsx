'use client'

import React, { Dispatch, createContext, useReducer } from 'react'

import { ActionType } from '@/constants'

/* - - - - - */

type StateType = {
	departmentList: string
}

/* - - - - - */

const initialState:StateType = {
	departmentList: '<List>'
}

/* - - - - - */

const reducer = (state: StateType, action: ActionType) => {
	switch (action.type) {

		default:
			return state
	}
}

/* - - - - - */

export const BTXContext = createContext<{ state:StateType, dispatch:Dispatch<ActionType>
}>({ state: initialState, dispatch: () => null })

export const BTXContextProvider = ({children}:{children:React.ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<BTXContext.Provider value={{ state, dispatch }}>
			{children}
		</BTXContext.Provider>
	)
}