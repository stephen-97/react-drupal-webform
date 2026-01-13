import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Select from './fields-elements/select'

export const renderSelect = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props
  const WrapperComponent = components?.wrapper ?? Wrapper

  if (!field?.['#options']) return null

  const CustomSelect = components?.fieldById?.[fieldKey] ?? components?.select

  return (
    <WrapperComponent
      field={field}
      classNames={classNames}
      classNameFieldName="fieldSelect"
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomSelect ? <CustomSelect {...props} /> : <Select {...props} />}
    </WrapperComponent>
  )
}
