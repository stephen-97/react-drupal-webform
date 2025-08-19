import React from 'react'
import cn from 'classnames'
import styles from './layoutWrapper.module.scss'
import { ILayoutWrapperProps } from '../../../../../lib/types/components/layoutWrapper'
const LayoutWrapper = (props: ILayoutWrapperProps) => {
  const { field, classNames, components, children, fieldKey } = props

  const CustomLayout = components?.layout
  if (CustomLayout) {
    return <CustomLayout {...props}>{children}</CustomLayout>
  }

  return (
    <div
      key={fieldKey}
      className={cn(styles.layoutWrapper, classNames.fields.layout.wrapper)}
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

export default React.memo(LayoutWrapper)
