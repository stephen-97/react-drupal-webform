'use client'

import React from 'react'
import { ILabelWebformProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/label'
import styles from './custom.module.scss'
const CustomLabel = (props: ILabelWebformProps) => {
  const { field, fieldKey } = props

  const title = field?.['#title']
  return (
    <label htmlFor={fieldKey ?? ''} className={styles.customLabel}>
      {title}
    </label>
  )
}

export default CustomLabel
