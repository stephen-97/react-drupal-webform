export class CustomDrupalClient {
    async request(url: string) {
        let cache: RequestCache =
            process.env.FETCH_CACHE_ENABLE == '0' ? 'no-cache' : 'force-cache'
        let options = {
            cache: cache,
        }

        const result = await fetch(
            process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + url,
            options
        )

        return await result.json()
    }
}