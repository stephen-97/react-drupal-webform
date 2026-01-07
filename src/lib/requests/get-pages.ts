// lib/requests/get-all-pages.ts
import { drupal } from '@/lib/drupal'

export async function getAllPages() {
  const response = await drupal.request(
    '/jsonapi/node/page?fields[node--page]=path'
  )

  return response.data
    .map((item: any) => item.attributes.path?.alias)
    .filter(Boolean)
    .map((alias: string) => alias.replace('/', ''))
}
