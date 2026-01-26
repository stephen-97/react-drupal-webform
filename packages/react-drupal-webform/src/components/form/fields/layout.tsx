import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import FormFieldRendered from '../formDefault/formFieldRendered'
import Layout from './fields-sub-components/layout/layout'
import { shouldFieldBeVisible } from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions'

const renderLayout = (
  props: TFieldWebformObj & { watchedValues?: Record<string, any> }
) => {
  const {
    fieldKey,
    field,
    components,
    watchedValues,
    classNamePrefix,
    unstyled,
  } = props

  const LayoutComponent = components?.layout ?? Layout
  const childKeys = Object.keys(field).filter((key) => !key.startsWith('#'))
  const values = watchedValues ?? {}

  return (
    <LayoutComponent {...props} fieldKey={fieldKey} key={fieldKey}>
      {childKeys.map((childKey, index) => {
        const child = (field as any)[childKey]

        if (!shouldFieldBeVisible(childKey, field, values)) return null

        return (
          <FormFieldRendered
            key={childKey}
            fieldKey={childKey}
            index={index}
            field={child}
            classNamePrefix={classNamePrefix}
            components={components}
            isMultiStep={false}
            watchedValues={watchedValues}
            unstyled={unstyled}
          />
        )
      })}
    </LayoutComponent>
  )
}

export default renderLayout
