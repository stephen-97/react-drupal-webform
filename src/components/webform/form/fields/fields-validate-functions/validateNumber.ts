import { TFieldValidate } from '@/lib/types/components/validate'
import { string } from 'yup'
import {
  formatMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const validateNumber = ({
  yupObject,
  defaultValues,
  key,
  field,
  required,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = formatMessage(
    getRequiredMessage(defaultFieldStateMessages, 'number') ?? '',
    field?.['#title']
  )

  yupObject[key] = required ? string().required(requiredMessage) : string()

  defaultValues[key] = defaultFieldValues.number
}
