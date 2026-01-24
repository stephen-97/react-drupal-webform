import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'

const renderDefault = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames, classNamePrefix } = props

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
      classNamePrefix={classNamePrefix}
    >
      <CustomField {...props} />
    </FieldContainerComponent>
  )
}

export default renderDefault
