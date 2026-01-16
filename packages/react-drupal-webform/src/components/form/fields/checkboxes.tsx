import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'
import Checkboxes from './fields-elements/checkboxes'

export const renderCheckboxes = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props
  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  if (!field?.['#options']) return null

  const CustomCheckboxes =
    components?.fieldById?.[fieldKey] ?? components?.checkboxes

  return (
    <FieldContainerComponent
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
    </FieldContainerComponent>
  )
}
