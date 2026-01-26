import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'

const renderDefault = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNamePrefix, unstyled } = props

  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  const CustomField = components?.unsupportedField

  if (!CustomField) {
    return null
  }

  return (
    <FieldContainerComponent
      field={field}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
      classNamePrefix={classNamePrefix}
      unstyled={unstyled}
    >
      <CustomField {...props} />
    </FieldContainerComponent>
  )
}

export default renderDefault
