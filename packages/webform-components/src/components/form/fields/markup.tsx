'use client'

import DOMPurify from 'isomorphic-dompurify'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import styles from './field.module.scss'
import cn from 'classnames'

export const renderMarkup = ({ field, key, classNames }: TFieldWebformObj) => {
  if (!(field?.['#markup'] && field?.['#markup']?.length > 0)) {
    return null
  }
  return (
    <div
      key={key}
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        classNames.fields.markup.base,
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
