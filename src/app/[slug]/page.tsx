import getForm from '@/lib/requests/get-form'
import { drupal } from '@/lib/drupal'
import styles from './page.module.scss'
import { TDrupal_PathData } from '@/lib/api-types/main-types'
import { TDrupal_Webform_Obj } from '@/lib/api-types/webform-types'
import { getWebformProperties } from '@/lib/functions/webform_functions'
import Webform from '@/components/webform/webform'
import WebformContainer from '@/components/webform/webformContainer'

interface IPage {
  params: {
    slug: string
  }
}

const Page = async ({ params }: IPage) => {
  const { slug } = await params
  const pathData: TDrupal_PathData = await drupal.request(
    `/router/translate-path/` +
      `?${new URLSearchParams({
        path: slug,
        format: '_json',
      })}`
  )

  const pageId: string = pathData?.entity?.uuid
  const form: TDrupal_Webform_Obj = await getForm(pageId)

  return (
    <main className={styles.main}>
      <div className={styles.webformContainer}>
        <WebformContainer
          elementsSource={form?.webform?.elements}
          confirmationPath={'/'}
        />
      </div>
    </main>
  )
}

export default Page
