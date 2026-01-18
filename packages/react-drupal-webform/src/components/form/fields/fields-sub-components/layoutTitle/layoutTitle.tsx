import React from 'react'
import cn from 'classnames'
import styles from '../layout/layout.module.scss'
import { LayoutTitleProps } from '../../../../../lib/types/components/layoutTitle'

const LayoutTitle = (props: LayoutTitleProps) => {
  const { field, classNames, className } = props

  if (!field?.['#title']) return null

  return (
    <div
      className={cn(
        styles.layoutTitle,
        classNames.fields.layout.title,
        className
      )}
    >
      {field['#title']}
    </div>
  )
}

export default LayoutTitle
