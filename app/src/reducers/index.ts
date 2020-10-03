import { combineReducers } from 'redux'
import service from 'service'
import app from './app'
import createGenericRepo, { GenericState } from './createGenericRepo'

const repo = createGenericRepo(
  'repo',
  { status: 'none' } as GenericState<string>,
  service.app.list
)

export const useRepo = repo.hook

export default combineReducers({
  app,
  repo: repo.slice.reducer
})