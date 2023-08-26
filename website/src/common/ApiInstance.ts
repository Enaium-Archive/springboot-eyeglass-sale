import { Api } from '@/__generated'
import { useSessionStore } from '@/store'

export const BASE_URL = 'http://localhost:8080'

export const api = new Api(async ({ uri, method, body }) => {
  const token = useSessionStore().session.token as string | undefined
  const response = await fetch(`${BASE_URL}${uri}`, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      ...(token !== undefined && token !== '' ? { token } : {})
    }
  })

  if (response.status === 401) {
    window.$router.push('/login')
    window.$message.error('请先登录')
    throw new Error()
  }

  if (response.status !== 200) {
    throw await response.json()
  }

  const text = await response.text()
  if (text.length === 0) {
    return null
  }
  return JSON.parse(text)
})
