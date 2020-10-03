import { createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import service from '../service'

export interface GenericState<T> {
  data?: T
  error?: Error,
  status: 'none' | 'loading' | 'finished' | 'error'
}

const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
    name = '',
    initialState,
    reducers
  }: {
  name: string
  initialState: GenericState<T>
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = 'loading'
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload
        state.status = 'finished'
      },

      fail(state: GenericState<T>, action: PayloadAction<Error>) {
        state.error = action.payload
        state.status = 'finished'
      },

      ...reducers
    }
  })
}

export default function createGenericRepo<
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>,
  P
>(
    name: string,
    initialState: GenericState<T>,
    effect: (params: P) => Promise<T>
  ) {
  const slice = createGenericSlice({
    name,
    initialState,
    reducers: {}
  })

  function hook(): [GenericState<T>, (params: P) => Promise<void>] {
    const data = useSelector<any, GenericState<T>>(state => state[name])
    const dispacth = useDispatch()
    const actions = slice.actions
  
    const load = async (params: P) => {
      dispacth(actions.start())
      try {
        const result = await effect(params)
        dispacth(actions.success(result))
      } catch (error) {
        dispacth(actions.fail(error))
      }
    }
  
    return [data, load]
  }

  return {
    slice,
    hook
  }
}