import { TFieldValidate } from '@/lib/types/components/validate'
import {
  formatMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { date } from 'yup'

export const validateDate = ({
  yupObject,
  defaultValues,
  key,
  required,
  defaultFieldValues,
  errorMessage,
  requiredMessage,
}: TFieldValidate) => {
  const schema = date()
    .test('valid-date-format', 'Invalid date', (value) => {
      if (!value) return true

      return !isNaN(Date.parse(value.toString()))
    })
    .nullable()
    .typeError(errorMessage)

  yupObject[key] = required
    ? schema.required(requiredMessage)
    : schema.notRequired()

  defaultValues[key] = defaultFieldValues.date
}
