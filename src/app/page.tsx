// app/page.tsx
import { drupal } from '@/lib/drupal'
import getForm from '@/lib/requests/get-form'
import styles from './[slug]/page.module.scss'
import WebformList from '@/components/webformList/webformList'
import { TDrupal_PathData } from '@/lib/api-types/main-types'
import DOMPurify from 'isomorphic-dompurify'
import { Metadata } from 'next'

export default async function HomePage() {
  const pathData: TDrupal_PathData = await drupal.request(
    `/router/translate-path/?${new URLSearchParams({
      path: `/`,
      _format: 'json',
    })}`
  )

  const pageId = pathData?.entity?.uuid as string
  const forms: any = await getForm(pageId)

  const safeBody: string = DOMPurify.sanitize(forms.body)

  return (
    <main className={styles.main}>
      <h1 className={styles.mainTitle}>{forms.title}</h1>
      <div
        className={styles.introText}
        dangerouslySetInnerHTML={{ __html: safeBody }}
      />
      <WebformList webforms={forms.webforms} />
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
  const forms: any = await getForm(pageId)

  return {
    title: forms.title,
  }
}
