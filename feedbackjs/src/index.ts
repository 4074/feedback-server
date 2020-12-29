import request from './request'
import Component from './component'
import { deepExtends, uuid } from './utils'
import emitter from './emitter'

import { MODAL_SUBMIT_EVENT } from './component/modal'

export const SUBMITING_EVENT = 'SUBMITING_EVENT'
export const SUBMIT_SUCCESS_EVENT = 'SUBMIT_SUCCESS_EVENT'
export const SUBMIT_FAIL_EVENT = 'SUBMIT_FAIL_EVENT'

const USER_STORAGE_KEY = 'FEEDBACK_USER'

const defaults: FeedbackOptions = deepExtends(
  {
    server: DefaultServer,
    style: {
      primaryColor: '#1890ff',
      bottom: 48,
      right: 48,
      size: 48
    },
    strings: {
      title: '意见反馈',
      submit: '提 交',
      labels: {
        input: '您遇到的问题、意见或建议',
        image: '可附上相关截图（最多添加3张）'
      },
      placeholders: {
        input: '请输入',
        image: '上传或粘贴图片'
      },
      tips: {
        noMessage: '请填写意见或建议',
        success: '反馈成功',
        fail: '提交失败，请稍后重试'
      },
      contact: '或者直接联系管理员'
    }
  },
  // eslint-disable-next-line no-undef
  CustomDefaultOption
)

export default class Feedback {
  version = '0.1.0'

  private appId: string

  private __user: string

  private __data: Record<string, any> = {}

  private component?: Component

  private options: FeedbackOptions

  readonly window: Window

  constructor(window: Window) {
    this.window = window
  }

  /**
   * Setup feedback plugin
   * @param appId string The appId of current app
   * @param options object Custom options
   */
  init(appId: string, options: FeedbackOptions = defaults): void {
    this.destory()

    this.options = deepExtends(defaults, options)
    this.appId = appId

    this.__user = uuid()
    if (window.localStorage) {
      this.__user = window.localStorage.getItem(USER_STORAGE_KEY) || this.__user
      window.localStorage.setItem(USER_STORAGE_KEY, this.__user)
    }

    this.component = new Component(this.options)
    this.component.render(this.options.container || document.body)

    emitter.on(MODAL_SUBMIT_EVENT, this.submit)
  }

  /**
   * Destory feedback plugin
   */
  destory(): void {
    emitter.removeAll()
    if (this.component) {
      this.component.destory()
    }
  }

  /**
   * Get/Set user info
   * @param data string The user info
   * @returns any/void The user info
   */
  user(data: string): any {
    if (data === undefined) return this.__user
    this.__user = data
    if (window.localStorage)
      window.localStorage.setItem(USER_STORAGE_KEY, this.__user)
  }

  /**
   * Get custom data
   * @param key string
   * @param value any
   */
  getData(key: string): any {
    return this.__data[key]
  }

  /**
   * Set custom data
   * @param key string
   * @param value any
   */
  setData(key: string, value: any): void {
    this.__data[key] = value
  }

  /**
   * Submit the feedback
   * @param params object
   */
  submit = ({ message, files }: { message: string; files: File[] }): void => {
    const params = this.generateRequestData('feedback', message)
    if (this.options.server) {
      emitter.emit(SUBMITING_EVENT)
      request(this.options.server, params, files).then(
        (data) => {
          emitter.emit(SUBMIT_SUCCESS_EVENT, data)
        },
        (err) => {
          emitter.emit(SUBMIT_FAIL_EVENT, err)
        }
      )
    } else {
      // If no server be set, print the feedback data on console.
      // eslint-disable-next-line no-console
      console.log(params, files)
      const error = Error('No server specified in the options')
      emitter.emit(SUBMIT_FAIL_EVENT, error)
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  private generateRequestData(
    action: string,
    message?: string
  ): FeedbackRequestData {
    return {
      appId: this.appId,
      user: this.__user,
      data: JSON.stringify(this.__data),
      action,
      message,
      timestamp: new Date().getTime()
    }
  }
}

const instance = new Feedback(window)
;(window as any).Feedback = instance

// eslint-disable-next-line no-undef
if (AutoSetup) instance.init(AppId)
