import { PayloadAction, Draft } from "@reduxjs/toolkit"

function load<S extends Redux.LoadState>(): (state: Draft<S>) => S {
  return (state: Draft<S>): S => {
    state.loading = true
    return state as S
  }
}

// export declare type CaseReducerWithPrepare<State, Action extends PayloadAction> = {
//   reducer: CaseReducer<State, Action>;
//   prepare: PrepareAction<Action['payload']>;
// };

function loadFail<S extends Redux.LoadState>(): (state: Draft<S>, action: PayloadAction<Error>) => S {
  return (state: Draft<S>, action: PayloadAction<Error>) => {
    return {...state, loading: false, loaded: false, error: action.payload} as S
  }
}

function loadSuccess<T extends Redux.LoadState & { data?: R }, R>() {
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