'use client'

import { useState } from 'react'
import Container from '@/components/container/container'
import styles from './webformList.module.scss'

type Webform = {
  id: string
  title: string
  elements: any
}

type WebformListProps = {
  webforms: Webform[]
}

export default function WebformList({ webforms }: WebformListProps) {
  const [activeId, setActiveId] = useState<string>(webforms[0]?.id)

  const activeWebform = webforms.find((w) => w.id === activeId)

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        {webforms.map((webform) => (
          <button
            key={webform.id}
            type="button"
            onClick={() => setActiveId(webform.id)}
            className={
              webform.id === activeId ? styles.buttonActive : styles.button
            }
          >
            {webform.title}
          </button>
        ))}
      </div>

      {activeWebform && (
        <Container
          key={activeWebform.id}
          title={activeWebform.title}
          elementsSource={activeWebform.elements}
        />
      )}
    </div>
  )
}
