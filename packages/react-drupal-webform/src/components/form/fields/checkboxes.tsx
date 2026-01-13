import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Checkboxes from './fields-elements/checkboxes'

export const renderCheckboxes = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props
  const WrapperComponent = components?.wrapper ?? Wrapper

  if (!field?.['#options']) return null

  const CustomCheckboxes =
    components?.fieldById?.[fieldKey] ?? components?.checkboxes

  return (
    <WrapperComponent
      field={field}
      classNames={classNames}
      classNameFieldName="fieldCheckboxes"
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
      wrapperElement="fieldset"
    >
      {CustomCheckboxes ? (
        <CustomCheckboxes {...props} />
      ) : (
        <Checkboxes {...props} />
      )}
    </WrapperComponent>
  )
}
