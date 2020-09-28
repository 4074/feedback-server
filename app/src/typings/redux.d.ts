declare namespace Redux {
  type State = {
    app: AppState
  }

  interface LoadState {
    loading: boolean
    loaded: boolean
    error?: Error
  }

  interface AppState extends LoadState {
    data?: any[]
  }
}