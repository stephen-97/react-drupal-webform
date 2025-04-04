import NodeCache from 'node-cache'

const cache = new NodeCache()

export class CustomDrupalClient {
  async getToken() {
    if (!process.env.DRUPAL_CLIENT_ID || !process.env.DRUPAL_CLIENT_SECRET) {
      return null
    }

    let token = cache.get('accessToken')

    if (token == undefined) {
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
          body: `grant_type=client_credentials`,
          cache: 'no-cache',
        }
      )

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const responseJson = await response.json()

      cache.set(
        'accessToken',
        responseJson.access_token,
        responseJson.expires_in
      )

      token = responseJson.access_token
    }

    return token
  }

  async request(url: string) {
    const cache: RequestCache =
      process.env.FETCH_CACHE_ENABLE == '0' ? 'no-cache' : 'force-cache'

    const headers: any = {
      'Content-Type': 'application/json',
    }

    const options = {
      cache: cache,
      headers: headers,
    }

    if (url.includes('jsonapi/node')) {
      url += `&${new URLSearchParams('resourceVersion=rel:working-copy')}`
    }

    const result = await fetch(
      process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + url,
      options
    )

    return await result.json()
  }
}
