// app/[slug]/page.tsx
import getForm from '@/lib/requests/get-form'
import { drupal } from '@/lib/drupal'
import styles from './page.module.scss'
import { TDrupal_PathData } from '@/lib/api-types/main-types'
import WebformList from '@/components/webformList/webformList'

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params

  const pathData: TDrupal_PathData = await drupal.request(
    `/router/translate-path/?${new URLSearchParams({
      path: `/${slug}`,
      _format: 'json',
    })}`
  )

  const pageId = pathData?.entity?.uuid as string
  const form = await getForm(pageId)

  return (
    <main className={styles.main}>
      <h1 className={styles.mainTitle}>react-drupal-webform Demo</h1>
      <p className={styles.introText}>
        Hello ! This website showcases a few example Webforms built using the
        react-drupal-webform package. The forms displayed here are for
        demonstration purposes only and{' '}
        <strong>
          don't perform any real submission or send data to a backend.
        </strong>
      </p>
      <WebformList webforms={form.webforms} />
    </main>
  )
}
