import { TFieldValidate } from '@/lib/types/components/validate'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { date } from 'yup'

export const validateDate = ({
  yupObject,
  defaultValues,
  key,
  required,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(defaultFieldStateMessages, 'date')

  const schema = date()
    .test('valid-date-format', 'Invalid date', (value) => {
      if (!value) return true

      return !isNaN(Date.parse(value.toString()))
    })
    .nullable()
    .typeError('Invalid date')

  yupObject[key] = required
    ? schema.required(requiredMessage)
    : schema.notRequired()

  defaultValues[key] = defaultFieldValues.date
}
