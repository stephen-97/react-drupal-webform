import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'
import Select from './fields-elements/select'

export const renderSelect = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNamePrefix, unstyled } = props
  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  if (!field?.['#options']) return null

  const CustomSelect = components?.fieldById?.[fieldKey] ?? components?.select

  return (
    <FieldContainerComponent
      field={field}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
      classNamePrefix={classNamePrefix}
      unstyled={unstyled}
    >
      {CustomSelect ? <CustomSelect {...props} /> : <Select {...props} />}
    </FieldContainerComponent>
  )
}
