import Modal from './modal'
import Trigger from './trigger'
import theme from './theme'

import './style.scss'

export default class Component {
  private $conainer: HTMLDivElement

  private options: FeedbackOptions

  private trigger: Trigger

  private modal: Modal

  constructor(options: FeedbackOptions) {
    this.options = options
  }

  render(parent: Element): void {
    theme.set(this.options.style)

    this.$conainer = document.createElement('div')
    this.$conainer.classList.add('feedback-container')
    parent.appendChild(this.$conainer)

    this.modal = new Modal()
    this.modal.render(this.$conainer, this.options.strings)

    this.trigger = new Trigger()
    this.trigger.render(this.$conainer)
  }

  destory(): void {
    if (this.$conainer && this.$conainer.parentElement) {
      this.$conainer.parentElement.removeChild(this.$conainer)
    }
  }
}
