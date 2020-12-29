import { iconClose, iconFeedback } from '../icons'
import emitter from '../emitter'
import { MODAL_VISIBLE_CHANGE_EVENT } from './modal'

export const TRIGGER_CLICK = 'TRIGGER_CLICK'

export default class Trigger {
  private $element: HTMLDivElement

  render(parent: Element): void {
    this.remove()
    this.$element = document.createElement('div')
    this.$element.classList.add('feedback-trigger')
    this.$element.innerHTML = `
      <div class="trigger-icon trigger-icon-normal">${iconFeedback}</div>
      <div class="trigger-icon trigger-icon-active">${iconClose}</div>
    `
    parent.appendChild(this.$element)
    this.$element.addEventListener('click', () => {
      emitter.emit(TRIGGER_CLICK)
    })

    emitter.on(MODAL_VISIBLE_CHANGE_EVENT, this.changeMode)
  }

  show = (): void => {
    if (!this.$element) return
    this.$element.style.display = 'block'
  }

  remove = (): void => {
    if (!this.$element || !this.$element.parentElement) return
    this.$element.parentElement.removeChild(this.$element)
  }

  changeMode = (visible: boolean): void => {
    if (!this.$element) return
    if (visible) {
      this.$element.classList.add('active')
    } else {
      this.$element.classList.remove('active')
    }
  }
}
