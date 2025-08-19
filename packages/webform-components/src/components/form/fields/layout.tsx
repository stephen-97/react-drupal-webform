import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import FormFieldRendered from '../formDefault/formFieldRendered'
import LayoutWrapper from './fields-sub-components/layoutWrapper/layoutWrapper'
import { shouldFieldBeVisible } from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions'
import { useFormContext, useWatch } from 'react-hook-form'

const renderLayout = (props: TFieldWebformObj) => {
  const { key, field, classNames, components, valueFormat, isMultiStep } = props

  const { control } = useFormContext()

  // on surveille tous les champs enfants du layout
  const childKeys = Object.keys(field).filter((k) => !k.startsWith('#'))
  const watchedValues = useWatch({ control })

  const { key: _omitKey, ...restProps } = props

  return (
    <LayoutWrapper {...restProps} fieldKey={key} key={key}>
      {childKeys.map((childKey, i) => {
        const child = (field as any)[childKey]

        const isVisible = shouldFieldBeVisible(
          childKey,
          field,
          watchedValues,
          valueFormat
        )

        if (!isVisible) return null

        return (
          <FormFieldRendered
            key={childKey}
            fieldKey={childKey}
            index={i}
            field={child}
            valueFormat={valueFormat}
            components={components}
            classNames={classNames}
            isMultiStep={isMultiStep}
          />
        )
      })}
    </LayoutWrapper>
  )
}

export default renderLayout
