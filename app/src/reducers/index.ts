import { PayloadAction } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import service from 'service'
import app from './app'
import createGenericRepo, { createRepos } from './createGenericRepo'

const repo = createGenericRepo(
  'repo',
  service.app.list
)
repo.slice.actions
export const useRepo = repo.hook
useRepo()[1]()

const save = createGenericRepo(
  'save',
  service.app.list
)

save.handles.success.push((dispatch) => {
  dispatch(repo.slice.actions.reducer((state) => {
    state.data?.apps
  }))
})

const repos = createRepos({
  app: service.app.list
})

repos.hooks.app()[0].data?.apps

export default combineReducers({
  app
})