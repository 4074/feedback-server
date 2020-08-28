declare namespace Log {
  interface Base {
    location: string
    action: string
    params?: any
    date: Date
  }

  interface Request extends Base {
    ip: string
    host: string
    path: string
    referer: string
    userAgent: string
    stage: string
    duration?: number
    error?: any
  }

  interface Notify extends Base {
    type: string
    reciever: string
    message: string
    error?: string
  }

  interface Error extends Base {
    error: string
  }
}
