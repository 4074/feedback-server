import { create } from 'service'
import reduxu from 'redux-use'

const appSave = reduxu.async(create<API.AppController.SaveData, API.AppController.SaveParams>('app/save', 'post'))
export const useAppSave = appSave.hook

const appRemove = reduxu.async(create<API.AppController.RemoveData, API.AppController.RemoveParams>('app/remove', 'post'))
export const useAppRemove = appRemove.hook

export const useApp = reduxu.async(create<API.AppController.ListData>('app/list'), {
  extraReducers(builder) {
    builder.addCase(appSave.thunk.fulfilled, (state, action) => {
      if (!state.data) return
      const index = state.data.apps.findIndex(item => item.appId === action.payload.appId)
      if (index >= 0) {
        state.data.apps[index] = action.payload
      } else {
        state.data.apps.push(action.payload)
      }
    })

    builder.addCase(appRemove.thunk.fulfilled, (state, action) => {
      if (!state.data) return
      state.data.apps = state.data.apps.filter(item => item.appId !== action.payload.appId)
    })
  }
}).hook

export const useFeedback = reduxu.async(create<API.FeedbackController.ListData>('feedback/list')).hook

export default reduxu.reducer()