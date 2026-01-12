import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Checkboxes from './fields-elements/checkboxes'

export const renderCheckboxes = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props
  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const CustomCheckboxes =
    components?.fieldById?.[fieldKey] ?? components?.checkboxes

  const controller = useController<any>({ name: fieldKey, control })
  const { fieldState } = controller

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldCheckboxes"
      stateError={fieldState?.error}
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
    </Wrapper>
  )
}
