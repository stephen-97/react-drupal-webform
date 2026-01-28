import React from 'react'
import cn from 'classnames'
import styles from '../layout/layout.module.scss'
import { LayoutListProps } from '../../../../../lib/types/components/layoutList'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const LayoutList = (props: LayoutListProps) => {
  const { children, className, innerProps, classNamePrefix, unstyled } = props

  if (!children) return null

  const layoutListClassNames = getClassNames({
    name: 'layoutList',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.layoutList),
  })

  const dataAttributes = getDataAttributes({
    component: 'layoutList',
  })

  return (
    <div className={layoutListClassNames} {...dataAttributes} {...innerProps}>
      {children}
    </div>
  )
}

export default LayoutList
