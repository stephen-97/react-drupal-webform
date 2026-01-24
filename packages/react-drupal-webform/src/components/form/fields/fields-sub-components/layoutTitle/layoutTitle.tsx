import React from 'react'
import cn from 'classnames'
import styles from '../layout/layout.module.scss'
import { LayoutTitleProps } from '../../../../../lib/types/components/layoutTitle'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const LayoutTitle = (props: LayoutTitleProps) => {
  const { field, innerProps, className, classNamePrefix } = props

  if (!field?.['#title']) return null

  const layoutListClassNames = getClassNames({
    name: 'layoutTitle',
    prefix: classNamePrefix,
    baseCn: cn(styles.layoutTitle, className),
  })

  const dataAttributes = getDataAttributes({
    component: 'layoutTitle',
  })

  return (
    <div className={layoutListClassNames} {...innerProps} {...dataAttributes}>
      {field['#title']}
    </div>
  )
}

export default LayoutTitle
