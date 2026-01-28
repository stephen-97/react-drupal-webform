import React from 'react'
import DOMPurify from 'isomorphic-dompurify'
import { WysiwygProps } from '../../../../../lib/types/components/wysiwyg'
import cn from 'classnames'
import styles from './wysiwyg.module.scss'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const Wysiwyg = ({
  processed,
  as: Element = 'div',
  className,
  classNamePrefix,
  innerProps,
  unstyled,
}: WysiwygProps) => {
  const wysiwygClassNames = getClassNames({
    name: 'wysiwyg',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.wysiwyg),
  })

  const dataAttributes = getDataAttributes({
    component: 'wysiwyg',
  })
  return (
    <Element
      className={wysiwygClassNames}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(processed, {
          ADD_TAGS: ['iframe'],
          ADD_ATTR: ['target'],
        }),
      }}
      {...dataAttributes}
      {...(innerProps as any)}
    ></Element>
  )
}

export default React.memo(Wysiwyg)
