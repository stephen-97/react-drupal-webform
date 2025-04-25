'use client'

import DOMPurify from 'isomorphic-dompurify'
import { IWysiwygProps } from '@/lib/types/components/wysiwyg'

const Wysiwyg = ({
  processed,
  as: Element = 'div',
  className,
}: IWysiwygProps) => {
  return (
    <Element
      className={className}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(processed, {
          ADD_TAGS: ['iframe'],
          ADD_ATTR: ['target'],
        }),
      }}
    ></Element>
  )
}

export default Wysiwyg
