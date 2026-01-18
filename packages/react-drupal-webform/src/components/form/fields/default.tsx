import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'

const renderDefault = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props

  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  const CustomField = components?.unsupportedField

  if (!CustomField) {
    return null
  }

  return (
    <FieldContainerComponent
      field={field}
      classNames={classNames}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      <CustomField {...props} />
    </FieldContainerComponent>
  )
}

export default renderDefault
