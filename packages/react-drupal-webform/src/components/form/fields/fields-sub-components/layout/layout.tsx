import React from 'react'
import cn from 'classnames'
import styles from './layout.module.scss'
import { LayoutProps } from '../../../../../lib/types/components/layoutWrapper'

const Layout = (props: LayoutProps) => {
  const { field, classNames, children, fieldKey, className, innerProps } = props

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
      {field['#title'] && (
        <div className={cn(styles.layoutTitle, classNames.fields.layout.title)}>
          {field['#title']}
        </div>
      )}

      <div className={cn(styles.layoutInner, classNames.fields.layout.inner)}>
        {children}
      </div>
    </div>
  )
}

export default React.memo(Layout)
