'use client'

import React from 'react'
import DOMPurify from 'isomorphic-dompurify'
import cn from 'classnames'
import styles from './customWysiwyg.module.scss'
import { IWysiwygProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/wysiwyg'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'

const CustomWysiwyg = (props: IWysiwygProps) => {
  const { processed, source } = props

  if (source !== 'markup') {
    return <components.Wysiwyg {...props}></components.Wysiwyg>
  }

  return (
    <div
      className={cn(styles.customWysiwyg)}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(processed, {
          ADD_TAGS: ['iframe'],
          ADD_ATTR: ['target', 'allow', 'allowfullscreen'],
        }),
      }}
    />
  )
}

export default React.memo(CustomWysiwyg)
