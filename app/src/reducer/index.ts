// import { PayloadAction } from '@reduxjs/toolkit'
import service from 'service'
// import app from './app'
import createGenericRepo from './createGenericRepo'

// const repo = createGenericRepo(
//   'repo',
//   service.app.list
// )
// repo.slice.actions
// export const useRepo = repo.hook
// useRepo()[1]()

// const save = createGenericRepo(
//   'save',
//   service.app.list
// )

// save.handles.success.push((dispatch) => {
//   dispatch(repo.slice.actions.reducer((state) => {
//     state.data?.apps
//   }))
// })

// const repos = createRepos({
//   app: service.app.list
// })

// repos.hooks.app()[0].data?.apps

const app = createGenericRepo(
  'app',
  service.app.list
)
export const useApp = app.hook

const appSave = createGenericRepo('appSave', service.app.save)
export const useAppSave = appSave.hook

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

const appRemove = createGenericRepo('appRemove', service.app.remove)
export const useAppRemove = appRemove.hook

appRemove.handles.success.push((dispatch, data) => {
  dispatch(app.slice.actions.intercept((state) => {
    if (!state.data) return
    state.data.apps = state.data.apps.filter(item => item.appId !== data.appId)
  }))
})


export default {
  ...app.reducer,
  ...appSave.reducer,
  ...appRemove.reducer
} as any