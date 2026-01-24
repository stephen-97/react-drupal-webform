import React from 'react'
import cn from 'classnames'
import styles from './layout.module.scss'
import { LayoutProps } from '../../../../../lib/types/components/layout'
import LayoutTitle from '../layoutTitle/layoutTitle'
import LayoutList from '../layoutList/layoutList'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const Layout = (props: LayoutProps) => {
  const {
    children,
    fieldKey,
    className,
    innerProps,
    classNamePrefix,
    components,
    field,
  } = props

  const LayoutTitleComponent = components?.layoutTitle ?? LayoutTitle
  const LayoutListComponent = components?.layoutList ?? LayoutList

  const layoutClassNames = getClassNames({
    name: 'layout',
    prefix: classNamePrefix,
    baseCn: cn(styles.layoutWrapper, className),
  })

  const dataAttributes = getDataAttributes({
    type: field?.['#type'],
    component: 'Layout',
  })

  return (
    <div
      key={fieldKey}
      className={layoutClassNames}
      {...dataAttributes}
      {...innerProps}
    >
      <LayoutTitleComponent {...props} />

      <LayoutListComponent {...props}>{children}</LayoutListComponent>
    </div>
  )
}

export default React.memo(Layout)
