import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Radios from './fields-elements/radios'

export const renderRadio = (props: TFieldWebformObj) => {
  const { fieldKey, field, classNames, components } = props
  const WrapperComponent = components?.wrapper ?? Wrapper

  if (!field?.['#options']) return null

  const CustomRadio = components?.fieldById?.[fieldKey] ?? components?.radios

  return (
    <WrapperComponent
      field={field}
      classNames={classNames}
      classNameFieldName="fieldRadio"
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
      wrapperElement="fieldset"
    >
      {CustomRadio ? <CustomRadio {...props} /> : <Radios {...props} />}
    </WrapperComponent>
  )
}
