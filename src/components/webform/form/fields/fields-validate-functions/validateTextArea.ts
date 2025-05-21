import { TFieldValidate } from '@/lib/types/components/validate'
import {
  formatMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { string } from 'yup'

export const validateTextArea = ({
  yupObject,
  defaultValues,
  key,
  required,
  defaultFieldValues,
  defaultFieldStateMessages,
  field,
}: TFieldValidate) => {
  const requiredMessage = formatMessage(
    getRequiredMessage(defaultFieldStateMessages, 'textarea') ?? '',
    field?.['#title']
  )

  yupObject[key] = required ? string().required(requiredMessage) : string()

  defaultValues[key] = defaultFieldValues.textarea
}
