import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import reducer from './reducer'

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants
      // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      ignoredActionPaths: ['payload.interceptor']
    }
  })
})

interface ReduxProviderProps {
  children: JSX.Element | JSX.Element[]
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>
}