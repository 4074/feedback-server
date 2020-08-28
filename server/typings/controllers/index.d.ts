declare namespace Model {
  interface App {
    name: string
    appId: string
    appKey: string
    timestamp: number
  }

  interface Feecback {
    appId: string
    path: string
    userAgent: string
    user: string
    data: Record<string, any>
    message: string
    timestamp: number
    createAt: Date
  }
}

declare namespace Params {
  namespace Feedback {
    interface List {
      uid: number
    }
  }

  namespace App {
    interface Save extends Model.App {
      appId: string | undefined
      appKey: string | undefined
    }
  }
}
