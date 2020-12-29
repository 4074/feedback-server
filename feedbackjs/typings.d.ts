declare module '*.svg'
declare const DefaultServer: string
declare const CustomDefaultOption: Record<string, any>
declare const AutoSetup: boolean
declare const AppId: string

declare type StringKeyObj<T> = {
  [key in string]: T
}

declare namespace Model {
  interface App {
    id: string
  }

  interface Request {
    id?: number
    upload: (data: any) => void
  }
}

declare interface FeedbackOptions {
  container?: Element
  server: string
  style: FeedbackStyle
  strings: FeedbackStrings
}

interface FeedbackStyle {
  primaryColor: string
  bottom: number
  right: number
  size: number
}

interface FeedbackStrings {
  title?: string
  submit?: string
  labels?: {
    input?: string
    image?: string
  }
  placeholders?: {
    input?: string
    image?: string
  }
  tips?: {
    noMessage?: string
    success?: string
    fail?: string
  }
  contact?: string
}

interface FeedbackRequestData {
  appId: string
  path?: string
  user?: any
  data?: any
  action: string
  message?: string
  timestamp: number
}
