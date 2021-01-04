export const isDiff = (a: any, b: any): boolean => {
  if (a === b) return false
  if (typeof a !== typeof b) return true

  if (Array.isArray(a) && !Array.isArray(b)) return true
  if (!Array.isArray(a) && Array.isArray(b)) return true

  if (Array.isArray(a)) {
      if (a.length !== b.length) return true
      for (let i = 0; i < a.length; i += 1) {
          if (isDiff(a[i], b[i])) return true
      }
      return false
  } else if (typeof a === 'object') {
      for (const key of Object.keys(a)) {
          if (isDiff(a[key], b[key])) return true
      }
      for (const key of Object.keys(b)) {
          if (isDiff(a[key], b[key])) return true
      }
      return false
  }

  return a !== b
}
