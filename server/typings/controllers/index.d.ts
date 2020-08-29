declare namespace Model {
  interface App {
    name: string
    appId?: string
    hosts: string[]
    timestamp?: number
  }

  interface Feedback {
    appId: string
    path: string
    userAgent: string
    user: string
    action: 'open' | 'feedback'
    data: Record<string, any>
    message: string
    images?: string[]
    timestamp: number
    createAt: Date
  }
}

declare namespace API {
  namespace AppController {
    interface ListData {
      apps: Model.App[]
    }

    type SaveParams = Model.App
    type SaveData = Model.App
  }
}
