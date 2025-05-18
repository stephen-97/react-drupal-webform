import { TFieldValidate } from '@/lib/types/components/validate'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { string } from 'yup'

export const validateTextArea = ({
  yupObject,
  defaultValues,
  key,
  required,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(
    defaultFieldStateMessages,
    'textarea'
  )

  yupObject[key] = required ? string().required(requiredMessage) : string()

  defaultValues[key] = defaultFieldValues.textarea
}
