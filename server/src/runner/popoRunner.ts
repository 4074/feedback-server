import axios from 'axios'
import config from '../config'

export const sendPopoNotification = async (
  message: string,
  reciever: string[] = []
): Promise<boolean> => {
  if (reciever.length === 0) return

  const uri = 'http://notify.nie.netease.com/api/v1/messages'
  const params = {
      message_type: 'popo',
      reciever_list: reciever,
      content: message,
      sender: config.popo.account
  }

  let error: string
  try {
      await axios.request({
          url: uri,
          method: 'post',
          data: params,
          headers: {
              'X-Notify-AccessKey': config.popo.token,
              'Content-Type': 'application/json; charset=utf-8'
          }
      })
  } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      error = err.message
  }

  const log: Log.Notify = {
      location: 'notify',
      action: 'send',
      date: new Date(),
      type: 'popo',
      reciever: reciever.join(','),
      message
  }

  if (error) {
      log.error = error
      // sendErrorLog(log)
  } else {
      // sendInfoLog(log)
  }

  // LogService.log(uri, new Date().getTime() - date.getTime(), 'notify', {
  //     params,
  //     status,
  //     result
  // })

  return !error
}

function formatMessage(feedback: Model.Feedback): string {
  let message = `${feedback.user} 在 ${feedback.path} 反馈了：\n`
  if (feedback.message.length > 400) {
    message += feedback.message.substr(0, 400) + '...\n(更多内容请上系统查看)'
  } else {
    message += feedback.message
  }
  if (feedback.images?.length) message += '\n' + feedback.images.map(i => `[img]${i}[/img]`).join('\n')
  
  return message
}

export default async function (
  action: Model.AppPopoAction,
  feedback: Model.Feedback
): Promise<any> {
  let message = formatMessage(feedback)

  if (action.receiver?.length) return sendPopoNotification(message, action.receiver)
}
