import { TFieldValidate } from '@/lib/types/components/validate'
import {
  getErrorMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { string } from 'yup'

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
