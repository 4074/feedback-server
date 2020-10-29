/* eslint-disable react-hooks/rules-of-hooks */

import { createSlice, combineReducers, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { Reducer, CombinedState, Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

export interface GenericState<P, T> {
  params?: P
  data?: T
  error?: Error,
  status: 'none' | 'loading' | 'finished' | 'error'
}

export interface EffectHandles<S> {
  success: ((dispatch: Dispatch, data: S) => any)[]
}

const createGenericSlice = <
  P,
  T,
  Reducers extends SliceCaseReducers<GenericState<P, T>>
>({
    name = '',
    initialState,
    reducers
  }: {
  name: string
  initialState: GenericState<P, T>
  reducers: ValidateSliceCaseReducers<GenericState<P, T>, Reducers>
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state: GenericState<P, T>, action: PayloadAction<P>) {
        state.params = action.payload
        state.status = 'loading'
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: GenericState<P, T>, action: PayloadAction<T>) {
        state.data = action.payload
        state.status = 'finished'
      },

      fail(state: GenericState<P, T>, action: PayloadAction<Error>) {
        state.error = action.payload
        state.status = 'finished'
      },

      intercept: {
        reducer(state: GenericState<P, T>, action: PayloadAction<{interceptor: (state: GenericState<P, T>) => void}>) {
          action.payload.interceptor(state)
        },
        // Wrap payload with a interceptor key.
        // Due to set `ignoredActionPaths: ['payload.interceptor']`.
        prepare(interceptor: (state: GenericState<P, T>) => void) {
          return {
            payload: {interceptor}
          }
        }
      },

      ...reducers
    }
  })
}

export function combineToReducer(...args: {name: string, slice: any}[]): Reducer {
  const combined: any = {}
  for (const { name, slice } of args) {
    combined[name] = slice.reducer
  }
  return combined as Reducer
}

export default function createGenericRepo<
  E extends (...args: any) => Promise<any>,
  P = Parameters<E>,
  T = E extends (...args: any) => Promise<infer R> ? R : never,
  H = E extends (...args: infer R) => Promise<T> ? (...args: R) => Promise<void> : never
>(
  name: string,
  effect: E,
  reducers: ValidateSliceCaseReducers<GenericState<P, T>, SliceCaseReducers<GenericState<P, T>>> = {}
) {

  const initialState = { status: 'none' } as GenericState<P, T>

  const slice = createGenericSlice({
    name,
    initialState,
    reducers
  })

  const handles: EffectHandles<T> = {
    success: []
  }

  function hook(): [GenericState<P, T>, H] {
    const data = useSelector<any, GenericState<P, T>>(state => state[name])
    const dispacth = useDispatch()
    const actions = slice.actions

    const load = (async (...params: any) => {
      dispacth(actions.start(params))
      try {
        const result = await effect(...params)
        for (const handle of handles.success) {
          handle(dispacth, result)
        }
        dispacth(actions.success(result))
      } catch (error) {
        dispacth(actions.fail(error))
      }
    }) as any
  
    return [data, load]
  }

  return {
    name,
    slice,
    reducer: {
      [name]: slice.reducer
    },
    hook,
    handles
  }
}

type EffectHook<
  E extends (...args: any) => Promise<any>,
  T = E extends (...args: any) => Promise<infer R> ? R : never,
  H = E extends (...args: infer R) => Promise<T> ? (...args: R) => Promise<void> : never,
  P = Parameters<E>
> = () => [GenericState<P, T>, H]

export function createRepos<
  L extends {[key: string]: E},
  E extends (...args: any) => Promise<any>
>(list: L): { reducer: Reducer<CombinedState<{ [x: string]: any; }>, never>, hooks: {[k in keyof L]: EffectHook<L[k]>} } {

  const reducers: any = {}
  const hooks: any = {}

  for (const [name, effect] of Object.entries(list)) {
    const repo = createGenericRepo(name, effect)
    reducers[name] = repo.reducer
    hooks[name] = repo.reducer
  }

  return {
    reducer: combineReducers(reducers),
    hooks
  }
}