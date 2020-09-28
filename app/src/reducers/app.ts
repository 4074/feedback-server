import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import service from 'service'
import helper from './helper'

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
      prepare: helper.payloadPrepare<any[]>()
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