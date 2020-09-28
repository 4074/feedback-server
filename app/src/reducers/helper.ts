import { PayloadAction } from "@reduxjs/toolkit"

function load<T extends { loading: boolean, loaded: boolean, error?: Error }>() {
  return (state: T) => ({...state, loading: true, loaded: false, error: null})
}

function loadFail<T extends { loading: boolean, loaded: boolean, error?: Error }>() {
  return (state: T, action: PayloadAction<Error>) => ({...state, loading: false, loaded: false, error: action.payload})
}

function loadSuccess<T extends { loading: boolean, loaded: boolean, error?: Error, data?: R }, R>() {
  return (state: T, action: PayloadAction<R>) => ({...state, loading: false, loaded: true, error: null, data: action.payload})
}

function payloadPrepare<T>() {
  return (payload: T) => {
    return { payload }
  }
}

export default {
  load,
  loadFail,
  loadSuccess,
  payloadPrepare
}