import { string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/components/validate'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const renderTextArea = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  classNames,
  components,
}: TFieldObj) => {
  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldTextarea'}
      components={components}
      stateError={fieldState.error}
      key={keyForMap}
    >
      <textarea
        className={cn(styles.field, styles.textarea, {
          [styles.error]: fieldState.error,
        })}
        name={fieldController.name}
        minLength={field?.['#minlength']}
        maxLength={field?.['#maxlength']}
        rows={field?.['#rows'] ?? 10}
        placeholder={field?.['#placeholder']}
        onChange={(e) => fieldController.onChange?.(e)}
        value={fieldController.value ?? ''}
        onBlur={onBlur}
      />
    </Wrapper>
  )
}

export const validateTextArea = ({
  yupObject,
  defaultValues,
  key,
  visibility,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(
    defaultFieldStateMessages,
    'textarea'
  )

  yupObject[key] = visibility ? string().required(requiredMessage) : string()

  defaultValues[key] = defaultFieldValues.textarea
}
