import React from 'react'
import cn from 'classnames'
import styles from '../layout/layout.module.scss'
import { LayoutTitleProps } from '../../../../../lib/types/components/layoutTitle'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const LayoutTitle = (props: LayoutTitleProps) => {
  const { field, innerProps, className, classNamePrefix, unstyled } = props

  if (!field?.['#title']) return null

  const layoutTitleClassNames = getClassNames({
    name: 'layoutTitle',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.layoutTitle),
  })

  const dataAttributes = getDataAttributes({
    component: 'layoutTitle',
  })

  if (field?.['#type'] === 'fieldset') {
    return (
      <legend
        className={layoutTitleClassNames}
        {...innerProps}
        {...dataAttributes}
      >
        {field['#title']}
      </legend>
    )
  }

  if (field['#type'] === 'details') {
    return (
      <summary
        className={layoutTitleClassNames}
        {...innerProps}
        {...dataAttributes}
      >
        {field['#title']}
      </summary>
    )
  }

  return (
    <div className={layoutTitleClassNames} {...innerProps} {...dataAttributes}>
      {field['#title']}
    </div>
  )
}

export default LayoutTitle
