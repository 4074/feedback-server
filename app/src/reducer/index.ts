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

export default {
  ...app.reducer,
  ...appSave.reducer
} as any