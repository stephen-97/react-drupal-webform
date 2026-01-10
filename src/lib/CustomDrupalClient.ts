import NodeCache from 'node-cache'

const tokenCache = new NodeCache()

export class CustomDrupalClient {
  async getToken() {
    if (!process.env.DRUPAL_CLIENT_ID || !process.env.DRUPAL_CLIENT_SECRET) {
      return null
    }

    let token = tokenCache.get<string>('accessToken')

    if (!token) {
      const basic = Buffer.from(
        `${process.env.DRUPAL_CLIENT_ID}:${process.env.DRUPAL_CLIENT_SECRET}`
      ).toString('base64')

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'grant_type=client_credentials',
          cache: 'force-cache',
        }
      )

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const json = await response.json()

      tokenCache.set('accessToken', json.access_token, json.expires_in)

      token = json.access_token
    }

    return token
  }

  async request<T = any>(url: string): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (url.includes('jsonapi/node')) {
      url += `&${new URLSearchParams('resourceVersion=rel:working-copy')}`
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${url}`,
      {
        headers,
        cache: 'force-cache',
      }
    )

    if (!response.ok) {
      throw new Error(`Drupal request failed: ${response.status}`)
    }

    return response.json()
  }
}
