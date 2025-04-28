import styles from './page.module.css'
import getForm from '@/lib/requests/get-form'
import { drupal } from '@/lib/drupal'

interface IHomePage {
  params: {
    pageName: string
  }
}

const HomePage = async ({ params }: IHomePage) => {
  return <main className={styles.main}></main>
}

export default HomePage
