import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'
import Textarea from './fields-elements/textarea'

export const renderTextArea = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNamePrefix, unstyled } = props
  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  const CustomTextArea =
    components?.fieldById?.[fieldKey] ?? components?.textarea

  return (
    <FieldContainerComponent
      field={field}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
      classNamePrefix={classNamePrefix}
      unstyled={unstyled}
    >
      {CustomTextArea ? <CustomTextArea {...props} /> : <Textarea {...props} />}
    </FieldContainerComponent>
  )
}
