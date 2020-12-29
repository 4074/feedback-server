/**
 * Send a request to server
 * @param url string The request url
 * @param params object The params to send
 * @param files array The files to upload
 * @returns Promise
 */
export default function request<T>(
  url: string,
  params: StringKeyObj<any> = {},
  files: File[] = []
): Promise<T> {
  const formData = new FormData()

  // Append file to form data
  for (const file of files) {
    formData.append('files', file)
  }

  // Append params to form data
  for (const key of Object.keys(params)) {
    if (params[key] === undefined) continue
    formData.append(key, params[key])
  }

  // Create the option for fetch
  const option: RequestInit = {
    method: 'POST',
    mode: 'cors',
    body: formData,
    referrerPolicy: 'no-referrer-when-downgrade'
  }

  return fetch(url, option).then((resp) => resp.json())
}
