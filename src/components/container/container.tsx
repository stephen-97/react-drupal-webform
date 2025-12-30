'use client'

import React, { useMemo, useState } from 'react'
import WebformContainer from '@/components/webform/webformContainer'
import YAML from 'yaml'
import styles from './container.module.scss'

type Props = {
  elementsSource: string
  title: string
}

const Container = ({ elementsSource, title }: Props) => {
  const [copied, setCopied] = useState(false)

  const yamlText = useMemo(() => {
    return YAML.stringify(elementsSource, {
      lineWidth: 0,
      defaultStringType: 'PLAIN',
    })
  }, [elementsSource])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yamlText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {}
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.mainTitle}>{title}</h2>
      <div className={styles.containerWebform}>
        <section className={styles.left} aria-label="Webform preview">
          <WebformContainer elementsSource={elementsSource} />
        </section>

        <section className={styles.right} aria-label="Webform YAML">
          <div className={styles.panelHeader}>
            <h3 className={styles.title}>YAML</h3>

            <button
              type="button"
              className={styles.copyButton}
              onClick={handleCopy}
              aria-label="Copy YAML to clipboard"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
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
