import service from 'service'
import createRepo, { combineToReducer } from './createRepo'

const app = createRepo('app', service.app.list)
export const useApp = app.hook

const appSave = createRepo('app/save', service.app.save)
appSave.handles.success.push((dispatch, data) => {
  dispatch(app.slice.actions.intercept((state) => {
    if (!state.data) return
    const index = state.data.apps.findIndex(item => item.appId === data.appId)
    if (index >= 0) {
      state.data.apps[index] = data
    } else {
      state.data.apps.push(data)
    }
  }))
})
export const useAppSave = appSave.hook

const appRemove = createRepo('app/remove', service.app.remove)
appRemove.handles.success.push((dispatch, data) => {
  dispatch(app.slice.actions.intercept((state) => {
    if (!state.data) return
    state.data.apps = state.data.apps.filter(item => item.appId !== data.appId)
  }))
})
export const useAppRemove = appRemove.hook

const feedback = createRepo('feedback', service.feedback.list)
export const useFeedback = feedback.hook

export default combineToReducer(app, appSave, appRemove, feedback)