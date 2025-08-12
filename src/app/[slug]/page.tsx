// app/[slug]/page.tsx
import getForm from '@/lib/requests/get-form'
import { drupal } from '@/lib/drupal'
import styles from './page.module.scss'
import WebformContainer from '@/components/webform/webformContainer'
import { TDrupal_PathData } from '@/lib/api-types/main-types'
import { TDrupal_Webform_Obj } from '@/lib/api-types/webform-types'

export default async function Page({ params }: any) {
  const { slug } = params

  const pathData: TDrupal_PathData = await drupal.request(
    `/router/translate-path/?${new URLSearchParams({
      path: `/${slug}`,
      _format: 'json',
    })}`
  )

  const pageId = pathData?.entity?.uuid as string
  const form: TDrupal_Webform_Obj = await getForm(pageId)

  return (
    <main className={styles.main}>
      <div className={styles.webformContainer}>
        <WebformContainer elementsSource={form?.webform?.elements} />
      </div>
    </main>
  )
}
