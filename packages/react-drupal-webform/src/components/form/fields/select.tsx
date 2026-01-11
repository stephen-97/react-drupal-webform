import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Select from './fields-elements/select'

export const renderSelect = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props
  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const CustomSelect = components?.fieldById?.[fieldKey] ?? components?.select

  const controller = useController<any>({ name: fieldKey, control })
  const { fieldState } = controller

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldSelect"
      components={components}
      stateError={fieldState?.error}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomSelect ? <CustomSelect {...props} /> : <Select {...props} />}
    </Wrapper>
  )
}
