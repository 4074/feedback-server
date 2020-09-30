declare namespace Redux {
  type State = {
    app: AppState
  }

  interface LoadState extends object {
    loading: boolean
    loaded: boolean
    error?: Error
  }

  interface AppState extends LoadState {
    data?: API.AppController.ListData
  }
}