import popoRunner from './popoRunner'
import udataQuestionRunner from './udataQuestionRunner'

export default async function run(
  app: Model.App,
  feedback: Model.Feedback
): Promise<void> {
  if (!app.actions) return

  for (const action of app.actions) {
    if (action.on) {
      const value = feedback[action.on.field]
      const reg = new RegExp(action.on.test)
      if (!reg.test(value)) continue
    }

    switch (action.type) {
      case 'popo': {
        popoRunner(action, feedback)
        break
      }
      case 'udata-question': {
        udataQuestionRunner(action, feedback)
        break
      }
      default:
        break
    }
  }
}
