import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducer'

const store = configureStore({reducer})

interface ReduxProviderProps {
  children: JSX.Element | JSX.Element[]
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>
}