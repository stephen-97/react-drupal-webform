import { drupal } from '@/lib/drupal'
import getForm from '@/lib/requests/get-form'
import styles from './[slug]/page.module.scss'
import WebformList from '@/components/webformList/webformList'
import { TDrupal_PathData } from '@/lib/api-types/main-types'
import DOMPurify from 'isomorphic-dompurify'
import type { Metadata } from 'next'

export default async function HomePage() {
  const pathData: TDrupal_PathData = await drupal.request(
    `/router/translate-path/?${new URLSearchParams({
      path: `/`,
      _format: 'json',
    })}`
  )

  const pageId = pathData?.entity?.uuid as string
  const form = await getForm(pageId)
  const safeBody = DOMPurify.sanitize(form.body)

  return (
    <main className={styles.main}>
      <h1 className={styles.mainTitle}>{form.title}</h1>
      <div
        className={styles.introText}
        dangerouslySetInnerHTML={{ __html: safeBody }}
      />
      <WebformList webforms={form.webforms} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const pathData: TDrupal_PathData = await drupal.request(
    `/router/translate-path/?${new URLSearchParams({
      path: `/`,
      _format: 'json',
    })}`
  )

  const pageId = pathData?.entity?.uuid as string
  const form = await getForm(pageId)

  return {
    title: form.title,
  }
}
