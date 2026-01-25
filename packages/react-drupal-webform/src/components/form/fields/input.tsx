import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'
import Input from './fields-elements/input'

const renderInput = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames, classNamePrefix, unstyled } =
    props

  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  const CustomInput = components?.fieldById?.[fieldKey] ?? components?.input

  return (
    <FieldContainerComponent
      field={field}
      classNames={classNames}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
      classNamePrefix={classNamePrefix}
      unstyled={unstyled}
    >
      {CustomInput ? <CustomInput {...props} /> : <Input {...props} />}
    </FieldContainerComponent>
  )
}

export default renderInput
