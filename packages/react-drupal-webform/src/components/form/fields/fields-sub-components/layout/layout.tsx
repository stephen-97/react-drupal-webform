import React from 'react'
import cn from 'classnames'
import styles from './layout.module.scss'
import { LayoutProps } from '../../../../../lib/types/components/layout'
import LayoutTitle from '../layoutTitle/layoutTitle'
import LayoutList from '../layoutList/layoutList'

const Layout = (props: LayoutProps) => {
  const { classNames, children, fieldKey, className, innerProps, components } =
    props

  const LayoutTitleComponent = components?.layoutTitle ?? LayoutTitle
  const LayoutListComponent = components?.layoutList ?? LayoutList

  return (
    <div
      key={fieldKey}
      className={cn(
        styles.layoutWrapper,
        classNames.fields.layout.wrapper,
        className
      )}
      {...innerProps}
    >
      <LayoutTitleComponent {...props} />

      <LayoutListComponent {...props}>{children}</LayoutListComponent>
    </div>
  )
}

export default React.memo(Layout)
