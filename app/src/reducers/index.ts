import { combineReducers } from 'redux'
import service from 'service'
import app from './app'
import createGenericRepo, { createRepos } from './createGenericRepo'

const repo = createGenericRepo(
  'repo',
  service.app.list
)

export const useRepo = repo.hook
useRepo()[0].data

const repos = createRepos({
  app: service.app.list
})

repos.hooks.app()[0].data?.apps

export default combineReducers({
  app,
  ...repo.reducer
})