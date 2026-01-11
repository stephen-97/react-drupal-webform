import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Input from './fields-elements/input'

const renderInput = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props
  const { control } = useFormContext()

  const CustomInput = components?.fieldById?.[fieldKey] ?? components?.input

  const controller = useController<any>({ name: fieldKey, control })
  const { fieldState } = controller

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldInput"
      stateError={fieldState?.error}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomInput ? <CustomInput {...props} /> : <Input {...props} />}
    </Wrapper>
  )
}

export default renderInput
