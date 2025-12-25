import React from 'react'
import DOMPurify from 'isomorphic-dompurify'
import { IWysiwygProps } from '../../../../../lib/types/components/wysiwyg'
import cn from 'classnames'
import styles from './wysiwyg.module.scss'

const Wysiwyg = ({
  processed,
  as: Element = 'div',
  className,
}: IWysiwygProps) => {
  return (
    <Element
      className={cn(className, styles.wysiwyg)}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(processed, {
          ADD_TAGS: ['iframe'],
          ADD_ATTR: ['target'],
        }),
      }}
    ></Element>
  )
}

export default React.memo(Wysiwyg)
