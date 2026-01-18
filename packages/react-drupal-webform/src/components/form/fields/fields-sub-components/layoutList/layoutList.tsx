import React from 'react'
import cn from 'classnames'
import styles from '../layout/layout.module.scss'
import { LayoutListProps } from '../../../../../lib/types/components/layoutList'

const LayoutList = (props: LayoutListProps) => {
  const { children, classNames, className, innerProps } = props

  if (!children) return null

  return (
    <div
      className={cn(
        styles.layoutList,
        classNames.fields.layout.inner,
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  )
}

export default LayoutList
