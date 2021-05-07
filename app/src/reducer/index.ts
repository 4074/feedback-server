import service from 'service'
import reduxu from 'redux-use'

const appSave = reduxu.async(service.app.save)
export const useAppSave = appSave.hook

const appRemove = reduxu.async(service.app.remove)
export const useAppRemove = appRemove.hook

export const useApp = reduxu.async(service.app.list, {
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

export const useFeedback = reduxu.async(service.feedback.list).hook

export default reduxu.reducer()