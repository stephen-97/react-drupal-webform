import styles from './page.module.css'

interface IHomePage {
  params: {
    pageName: string
  }
}

const HomePage = async ({ params }: IHomePage) => {
  return <main className={styles.main}></main>
}

export default HomePage
