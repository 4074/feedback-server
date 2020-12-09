declare namespace Model {
  interface App {
    name: string
    appId?: string
    hosts: string[]
    actions?: AppAction[]
    timestamp?: number
  }

  type AppActionType = 'popo' | 'udata-question'

  interface AppAction {
    type: AppActionType
    on?: {
      field: 'host' | 'user'
      test: string
    }
  }

  interface AppPopoAction extends AppAction {
    receiver: string[]
  }

  interface AppUdataQuestionAction {
    project: string
  }

  interface Feedback {
    appId: string
    path: string
    userAgent: string
    user: string
    data: Record<string, any>
    message: string
    images: string[]
    timestamp: number
    createAt: Date
  }
}

declare namespace API {
  namespace AppController {
    interface MetaData {
      actionTypes: Model.AppActionType[]
    }

    interface ListData {
      apps: Model.App[]
    }

    type SaveParams = Model.App
    type SaveData = Model.App

    type RemoveParams = Model.App
    type RemoveData = Model.App
  }

  namespace FeedbackController {
    
    type ListData = Model.Feedback[]
    interface ReceiveParams
      extends Pick<
        Model.Feedback,
        'appId' | 'user' | 'message' | 'timestamp'
      > {
      data: string
    }
  }
}
