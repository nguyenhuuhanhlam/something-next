'use client'

import React, { Dispatch, createContext, useReducer } from 'react'

type AppState = {
	count: number
}

type AppAction = { type: string }

const initialState: AppState = {
	count: 0
}

export const AppContext = createContext<{state:AppState,dispatch:Dispatch<AppAction>
}>({ state: initialState, dispatch: ()=>null })

export const AppContextProvider = ({children}:{children:React.ReactNode}) => {
	return <AppContext.Provider>AppContextProvider::children--> {children}</AppContext.Provider>
}