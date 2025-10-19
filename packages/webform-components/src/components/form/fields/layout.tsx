import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import FormFieldRendered from '../formDefault/formFieldRendered'
import LayoutWrapper from './fields-sub-components/layoutWrapper/layoutWrapper'
import { shouldFieldBeVisible } from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions'

const renderLayout = (
  props: TFieldWebformObj & { watchedValues?: Record<string, any> }
) => {
  const { fieldKey, field, classNames, components, watchedValues } = props

  const childKeys = Object.keys(field).filter((k) => !k.startsWith('#'))

  const { fieldKey: _omitKey, ...restProps } = props

  return (
    <LayoutWrapper {...restProps} fieldKey={fieldKey} key={fieldKey}>
      {childKeys.map((childKey, i) => {
        const child = (field as any)[childKey]

        const isVisible = shouldFieldBeVisible(
          childKey,
          field,
          watchedValues ?? {}
        )

        if (!isVisible) return null

        return (
          <FormFieldRendered
            key={childKey}
            fieldKey={childKey}
            index={i}
            field={child}
            components={components}
            classNames={classNames}
            isMultiStep={false}
            watchedValues={watchedValues}
          />
        )
      })}
    </LayoutWrapper>
  )
}

export default renderLayout
