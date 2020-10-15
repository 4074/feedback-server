import { PayloadAction } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import service from 'service'
import app from './app'
import createGenericRepo, { createRepos } from './createGenericRepo'

const repo = createGenericRepo(
  'repo',
  service.app.list,
  {
    // save: {
    //   reducer: (state, action: PayloadAction<API.AppController.SaveData>) => {
    //     state.data?.apps[0].name
    //   }
    // }
  }
)

export const useRepo = repo.hook
useRepo()[1]()

const repos = createRepos({
  app: service.app.list
})

repos.hooks.app()[0].data?.apps

export default combineReducers({
  app,
  ...repo.reducer
})