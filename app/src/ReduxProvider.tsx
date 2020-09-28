import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'

const store = createStore(reducer)

interface ReduxProviderProps {
  children: JSX.Element | JSX.Element[]
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  console.log(store)
  return <Provider store={store}>{children}</Provider>
}