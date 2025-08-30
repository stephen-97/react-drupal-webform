import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import FormFieldRendered from '../formDefault/formFieldRendered'
import LayoutWrapper from './fields-sub-components/layoutWrapper/layoutWrapper'
import { shouldFieldBeVisible } from '../../../lib/functions/webform_fields_functions/webform_fields_conditional_functions'

const renderLayout = (
  props: TFieldWebformObj & { watchedValues?: Record<string, any> }
) => {
  const { key, field, classNames, components, valueFormat, watchedValues } =
    props

  const childKeys = Object.keys(field).filter((k) => !k.startsWith('#'))

  const { key: _omitKey, ...restProps } = props

  return (
    <LayoutWrapper {...restProps} fieldKey={key} key={key}>
      {childKeys.map((childKey, i) => {
        const child = (field as any)[childKey]

        const isVisible = shouldFieldBeVisible(
          childKey,
          field, // le layout complet
          watchedValues ?? {}, // ✅ on injecte les valeurs surveillées
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
            isMultiStep={false}
            watchedValues={watchedValues} // ✅ prop passé aux enfants
          />
        )
      })}
    </LayoutWrapper>
  )
}

export default renderLayout
