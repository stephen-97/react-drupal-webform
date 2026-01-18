import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'
import Textarea from './fields-elements/textarea'

export const renderTextArea = (props: TFieldWebformObj) => {
  const { fieldKey, field, classNames, components } = props
  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  const CustomTextArea =
    components?.fieldById?.[fieldKey] ?? components?.textarea

  return (
    <FieldContainerComponent
      field={field}
      classNames={classNames}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomTextArea ? <CustomTextArea {...props} /> : <Textarea {...props} />}
    </FieldContainerComponent>
  )
}
