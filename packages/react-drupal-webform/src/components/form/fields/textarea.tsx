import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Textarea from './fields-elements/textarea'

export const renderTextArea = (props: TFieldWebformObj) => {
  const { fieldKey, field, classNames, components } = props
  const WrapperComponent = components?.wrapper ?? Wrapper

  const CustomTextArea =
    components?.fieldById?.[fieldKey] ?? components?.textarea

  return (
    <WrapperComponent
      field={field}
      classNames={classNames}
      classNameFieldName="fieldTextarea"
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomTextArea ? <CustomTextArea {...props} /> : <Textarea {...props} />}
    </WrapperComponent>
  )
}
