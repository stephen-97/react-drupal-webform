// app/[slug]/page.tsx
import { drupal } from '@/lib/drupal'
import getForm from '@/lib/requests/get-form'
import styles from './page.module.scss'
import WebformList from '@/components/webformList/webformList'
import { TDrupal_PathData } from '@/lib/api-types/main-types'
import DOMPurify from 'isomorphic-dompurify'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'error'

export async function generateStaticParams() {
  const response = await drupal.request(
    '/jsonapi/node/page?fields[node--page]=path'
  )

  return response.data
    .map((item: any) => item.attributes.path?.alias)
    .filter(Boolean)
    .map((alias: string) => ({
      slug: alias.replace(/^\/+/, ''),
    }))
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const pathData: TDrupal_PathData = await drupal.request(
    `/router/translate-path/?${new URLSearchParams({
      path: `/${params.slug}`,
      _format: 'json',
    })}`
  )

  if (!pathData?.entity?.uuid) {
    return {}
  }

  const form = await getForm(pathData.entity.uuid)

  return {
    title: form.title,
  }
}

export default async function Page({ params }: any) {
  const pathData: TDrupal_PathData = await drupal.request(
    `/router/translate-path/?${new URLSearchParams({
      path: `/${params.slug}`,
      _format: 'json',
    })}`
  )

  if (!pathData?.entity?.uuid) {
    notFound()
  }

  const form = await getForm(pathData.entity.uuid)
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
