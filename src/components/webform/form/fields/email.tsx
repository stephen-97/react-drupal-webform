import { string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/components/validate'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import {
  getErrorMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const renderEmail = (props: TFieldObj) => {
  const { control, key, keyForMap, field, components, classNames, onBlur } =
    props

  const { key: _, ...restProps } = props

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  const CustomEmail = components?.email

  console.log(field)

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldInput'}
      stateError={fieldState.error}
      components={components}
      key={keyForMap}
    >
      {CustomEmail ? (
        <CustomEmail
          fieldController={fieldController}
          fieldState={fieldState}
          {...restProps}
        />
      ) : (
        <input
          className={cn(styles.field, styles.input, {
            [styles.error]: fieldState.error,
          })}
          name={fieldController.name}
          minLength={field?.['#minlength']}
          maxLength={field?.['#maxlength']}
          placeholder={field?.['#placeholder']}
          type={'text'}
          onChange={(e) => fieldController.onChange?.(e)}
          value={fieldController?.value ?? ''}
          onBlur={onBlur}
        />
      )}
    </Wrapper>
  )
}

export const validateEmail = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(defaultFieldStateMessages, 'email')
  const errorMessage = getErrorMessage(defaultFieldStateMessages, 'email')

  const emailWithTLDRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  const schema = string()
    .test('valid-email-format', 'invalid email', (value) => {
      if (!value) return true
      return emailWithTLDRegex.test(value)
    })
    .email(errorMessage)

  yupObject[key] = visibility
    ? schema.required(requiredMessage)
    : schema.notRequired()

  defaultValues[key] = ''

  defaultValues[key] = defaultFieldValues.email
}
