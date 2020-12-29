import { requestAnimationFrame } from '../utils'
import { iconSuccess, iconError } from '../icons'

export const TRIGGER_CLICK = 'TRIGGER_CLICK'

export default class Trigger {
  private $element: HTMLDivElement

  private $icon: HTMLSpanElement

  private $message: HTMLSpanElement

  private hideTimer: any = null

  render(parent: Element): void {
    this.remove()
    this.$element = document.createElement('div')
    this.$element.classList.add('feedback-alert')
    this.$element.innerHTML = `<span class="feedback-alert-icon">${iconSuccess}</span><span class="feedback-alert-message">反馈成功</span>`
    parent.appendChild(this.$element)

    this.$icon = this.$element.querySelector(
      '.feedback-alert-icon'
    ) as HTMLSpanElement

    this.$message = this.$element.querySelector(
      '.feedback-alert-message'
    ) as HTMLSpanElement
  }

  show = (type: 'success' | 'error', message: string, delay = 4000): void => {
    if (!this.$element) return

    this.$icon.innerHTML = type === 'success' ? iconSuccess : iconError
    this.$element.classList.remove(
      'feedback-alert-success',
      'feedback-alert-error'
    )
    this.$element.classList.add(`feedback-alert-${type}`)
    this.$message.innerText = message || ''

    clearTimeout(this.hideTimer)
    this.$element.style.display = 'block'
    requestAnimationFrame(() => {
      this.$element.classList.add('enter-end')
      this.hideTimer = setTimeout(() => {
        this.$element.classList.add('leave-end')
        setTimeout(() => {
          this.$element.classList.remove('enter-end', 'leave-end')
        }, 200)
      }, delay + 200)
    })
  }

  remove = (): void => {
    if (!this.$element || !this.$element.parentElement) return
    this.$element.parentElement.removeChild(this.$element)
  }
}
