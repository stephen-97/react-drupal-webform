import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'
import Select from './fields-elements/select'

export const renderSelect = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames } = props
  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  if (!field?.['#options']) return null

  const CustomSelect = components?.fieldById?.[fieldKey] ?? components?.select

  return (
    <FieldContainerComponent
      field={field}
      classNames={classNames}
      classNameFieldName="fieldSelect"
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomSelect ? <CustomSelect {...props} /> : <Select {...props} />}
    </FieldContainerComponent>
  )
}
