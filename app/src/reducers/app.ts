import { createSlice, PayloadAction, ValidateSliceCaseReducers, SliceCaseReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import service from 'service'
import helper from './helper'

interface GenericState<T> {
  data?: T
  status: 'loading' | 'finished' | 'error'
}

const createGenericSlice = <
  T extends GenericState<any>,
  Reducers extends SliceCaseReducers<T>
>({
    name = '',
    initialState,
    reducers
  }: {
  name: string
  initialState: T
  reducers: ValidateSliceCaseReducers<T, Reducers>
}) => {
  const slice = createSlice({
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
      success(state: T, action: PayloadAction<T['data']>) {
        state.data = action.payload
        state.status = 'finished'
      },
      ...reducers
    }
  })

  // function useSlice(): [GenericState<T>, () => Promise<void>] {
  //   const data = useSelector<Redux.State, GenericState<T>>(state => state.app)
  //   const dispacth = useDispatch()
  
  //   const load = async () => {
  //     dispacth(actions.load())
  //     try {
  //       const result = await service.app.list()
  //       dispacth(actions.loadSuccess(result))
  //     } catch (error) {
  //       dispacth(actions.loadFail(error))
  //     }
  //   }
  
  //   return [data, load]
  // }

  return [
    slice,
    // useSlice
  ]
}

const wrappedSlice = createGenericSlice({
  name: 'test',
  initialState: { status: 'loading' } as GenericState<string>,
  reducers: {
    magic(state) {
      state.status = 'finished'
      state.data = 'hocus pocus'
    }
  }
})

const initialState = {
  loading: false,
  loaded: false
} as Redux.AppState

const { actions, reducer } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    load: helper.load(),
    loadFail: {
      reducer: helper.loadFail(),
      prepare: helper.payloadPrepare<Error>()
    },
    loadSuccess: {
      reducer: helper.loadSuccess(),
      prepare: helper.payloadPrepare<API.AppController.ListData>()
    }
  }
})

export default reducer

export function useApp(): [Redux.AppState, () => Promise<void>] {
  const data = useSelector<Redux.State, Redux.AppState>(state => state.app)
  const dispacth = useDispatch()

  const load = async () => {
    dispacth(actions.load())
    try {
      const result = await service.app.list()
      dispacth(actions.loadSuccess(result))
    } catch (error) {
      dispacth(actions.loadFail(error))
    }
  }

  return [data, load]
}