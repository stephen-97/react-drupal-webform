'use client'

import React, { useMemo } from 'react'
import WebformContainer from '@/components/webform/webformContainer'
import YAML from 'yaml'
import styles from './container.module.scss'
import CustomWebform from '@/components/webform/customWebform/customWebform'

type Props = {
  elementsSource: string
  title: string
}

const Container = ({ elementsSource, title }: Props) => {
  const yamlText = useMemo(() => {
    return YAML.stringify(elementsSource, {
      lineWidth: 0,
      defaultStringType: 'PLAIN',
    })
  }, [elementsSource])

  return (
    <div className={styles.container}>
      <div className={styles.containerWebform}>
        <section className={styles.left} aria-label="Webform preview">
          {title === 'Multi Step Form' ? (
            <CustomWebform elementsSource={elementsSource} />
          ) : (
            <WebformContainer elementsSource={elementsSource} />
          )}
        </section>

        <section className={styles.right} aria-label="Webform YAML">
          <div className={styles.panelHeader}>
            <h3 className={styles.title}>YAML</h3>
          </div>

          <div className={styles.panelBody}>
            <pre className={styles.yaml} tabIndex={0}>
              <code>{yamlText}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  )
}

export default React.memo(Container)
