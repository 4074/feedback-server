/* eslint-disable import/prefer-default-export */

/**
 * Generates a uuid v4 from https://gist.github.com/jed/982883
 * @param a any The char should be replace with 0~f
 * @returns string
 */
export function uuid(a?: any): string {
  return a
    ? // eslint-disable-next-line no-bitwise
      (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : [1e7, -1e3, -4e3, -8e3, -1e11].join('').replace(/[018]/g, uuid)
}

/**
 * Set a timeout callback after one frame
 * @param fn function The timeout callback
 */
export function requestAnimationFrame(fn: () => void): void {
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(fn)
  } else {
    setTimeout(fn, 17)
  }
}

/**
 * Extends a object deeply
 * @param defaults object The default object
 * @param custom object The custom object
 * @returns object
 */
export function deepExtends<T extends R, R extends { [key: string]: any }>(
  defaults: T,
  custom: R
): T {
  const result: any = {}
  for (const key of Object.keys(defaults)) {
    if (typeof defaults[key] === 'object') {
      if (custom && custom[key]) {
        result[key] = deepExtends(defaults[key], custom && custom[key])
      } else {
        result[key] = defaults[key]
      }
    } else {
      result[key] =
        custom && custom[key] !== undefined ? custom[key] : defaults[key]
    }
  }
  return result as T
}

/**
 * Set a value by deep key in object
 * @param source object The origin object
 * @param keys array The linked keys
 * @param value any The value be set
 */
export function setDeepValue(source: object, keys: string[], value: any): void {
  let node: any = source
  let parent: any = source
  let index = 0

  while (node && typeof node === 'object' && index < keys.length) {
    parent = node
    node = node[keys[index]]
    index += 1
  }

  if (parent && typeof parent === 'object') parent[keys[index - 1]] = value
}

/**
 * Convert hex color and alpha value to rgba formatted string
 * @param color string Hex color value
 * @param alpha number Alpha value
 * @returns string
 */
export function rgba(color: string, alpha = 1): string {
  const hex = color.replace('#', '')
  let rgb = []
  if (hex.length === 3) {
    rgb = hex.split('').map((h) => h + h)
  } else if (hex.length === 6) {
    rgb = hex.split('').reduce((arr, h, i) => {
      if (i % 2) {
        arr.push(arr.pop() + h)
      } else {
        arr.push(h)
      }
      return arr
    }, [] as string[])
  } else {
    rgb = ['0', '0', '0']
  }

  return `rgba(${rgb.map((c) => parseInt(c, 16)).join(',')}, ${alpha})`
}

/**
 * Get media file from data transfer
 * @param transfer DataTransfer The file data transfer
 * @returns array The files
 */
export function getMediaFromTransfer(transfer: DataTransfer): File[] {
  const data: File[] = []
  if (transfer) {
    const { items, files } = transfer
    if (items) {
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i]
        if (item.kind === 'file') {
          const file = item.getAsFile() as File
          if (/^image\//.test(file.type)) {
            data.push(file)
          }
        }
      }
    } else {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i]
        if (/^image\//.test(file.type)) {
          data.push(file)
        }
      }
    }
  }
  return data
}
