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
    unstyled,
    innerRef,
  } = props

  const LayoutTitleComponent = components?.layoutTitle ?? LayoutTitle
  const LayoutListComponent = components?.layoutList ?? LayoutList

  const layoutClassNames = getClassNames({
    name: 'layout',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.layout),
  })

  const dataAttributes = getDataAttributes({
    type: field?.['#type'],
    component: 'Layout',
  })

  const Wrapper: React.ElementType =
    field?.['#type'] === 'details'
      ? 'details'
      : field?.['#type'] === 'fieldset'
        ? 'fieldset'
        : field?.['#type'] === 'webform_section'
          ? 'section'
          : 'div'

  return (
    <Wrapper
      key={fieldKey}
      ref={innerRef}
      className={layoutClassNames}
      {...dataAttributes}
      {...innerProps}
    >
      <LayoutTitleComponent {...props} />

      <LayoutListComponent {...props}>{children}</LayoutListComponent>
    </Wrapper>
  )
}

export default React.memo(Layout)
