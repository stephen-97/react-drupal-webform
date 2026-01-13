import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Input from './fields-elements/input'

const renderInput = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props

  const WrapperComponent = components?.wrapper ?? Wrapper

  const CustomInput = components?.fieldById?.[fieldKey] ?? components?.input

  return (
    <WrapperComponent
      field={field}
      classNames={classNames}
      classNameFieldName="fieldInput"
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomInput ? <CustomInput {...props} /> : <Input {...props} />}
    </WrapperComponent>
  )
}

export default renderInput
