'use client'

import React, {
	Dispatch,
	createContext,
	useReducer } from 'react'

import {
	ActionType,
	BTXDepartment } from '@/constants'

/* - - 2 - - */

type StateType = {
	departmentList: BTXDepartment[]
}

/* - - 3 - - */

const initialState:StateType = {
	departmentList: null
}

/* - - 4 - - */

const reducer = (state: StateType, action: ActionType) => {
	switch (action.type) {

		case 'DEPARTMENT_GET':
			return { ...state, departmentList:action.payload }
		default:
			return state
	}
}

/* - - 5 - - */

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