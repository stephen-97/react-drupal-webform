import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Textarea from './fields-elements/textarea'

export const renderTextArea = (props: TFieldWebformObj) => {
  const { fieldKey, field, classNames, components } = props
  const { control } = useFormContext()

  const CustomTextArea =
    components?.fieldById?.[fieldKey] ?? components?.textarea

  const controller = useController<any>({ name: fieldKey, control })
  const { fieldState } = controller

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldTextarea"
      components={components}
      stateError={fieldState?.error}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomTextArea ? <CustomTextArea {...props} /> : <Textarea {...props} />}
    </Wrapper>
  )
}
