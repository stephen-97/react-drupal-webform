import { TFieldValidate } from '@/lib/types/components/validate'
import { string } from 'yup'

export const validateEmail = ({
  yupObject,
  defaultValues,
  key,
  required,
  defaultFieldValues,
  requiredMessage,
  errorMessage,
}: TFieldValidate) => {
  const emailWithTLDRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  const schema = string()
    .test('valid-email-format', 'invalid email', (value) => {
      if (!value) return true
      return emailWithTLDRegex.test(value)
    })
    .email(errorMessage)

  yupObject[key] = required
    ? schema.required(requiredMessage)
    : schema.notRequired()

  defaultValues[key] = defaultFieldValues.email
}
