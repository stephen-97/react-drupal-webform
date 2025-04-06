'use client'

import DOMPurify from 'isomorphic-dompurify'
import { TFieldObj } from '@/lib/types/field'
import styles from './field.module.scss'
import cn from 'classnames'

export const renderMarkup = ({ field, keyForMap }: TFieldObj) => {
  if (!(field?.['#markup'] && field?.['#markup']?.length > 0)) {
    return null
  }
  return (
    <div
      key={keyForMap}
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        styles.fieldWrapper
      )}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(field['#markup'], {
          ADD_TAGS: ['iframe'],
          ADD_ATTR: ['target'],
        }),
      }}
    ></div>
  )
}
