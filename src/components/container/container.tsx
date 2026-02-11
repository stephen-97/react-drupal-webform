'use client'

import React from 'react'
import styles from './container.module.scss'
import CustomWebform from '@/components/webform/customWebform/customWebform'
import WebformContainer from '@/components/webform/webformContainer'

type Props = {
  elementsSource: string
  title: string
}

const Container = ({ elementsSource, title }: Props) => {
  const isRHF = title === 'Basic Form with RHF'

  return (
    <div className={styles.container}>
      <div className={styles.containerWebform}>
        <section className={styles.left} aria-label="Webform preview">
          <div className={styles.panelHeader}>
            <h2 className={styles.title}>Webform preview</h2>
          </div>
          <div className={styles.panelBody}>
            {title === 'Custom components' ? (
              <CustomWebform elementsSource={elementsSource} />
            ) : (
              <WebformContainer
                elementsSource={elementsSource}
                {...(isRHF ? { validationEngine: 'rhf' } : {})}
              />
            )}
          </div>
        </section>

        <section className={styles.right} aria-label="Webform YAML">
          <div className={styles.panelHeader}>
            <h2 className={styles.title}>YAML</h2>
          </div>

          <div className={styles.panelBody}>
            <pre className={styles.yaml} tabIndex={0}>
              <code>{elementsSource}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  )
}

export default React.memo(Container)
