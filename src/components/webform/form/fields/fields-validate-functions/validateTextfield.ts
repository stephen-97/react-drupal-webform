import { TFieldValidate } from '@/lib/types/components/validate'
import {
  formatMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { string } from 'yup'

export const validateTextField = ({
  yupObject,
  defaultValues,
  key,
  required,
  field,
  defaultFieldValues,
  defaultFieldStateMessages,
  requiredMessage,
}: TFieldValidate) => {
  const message = (yupObject[key] = required
    ? string().required(requiredMessage)
    : string())

  defaultValues[key] = defaultFieldValues.textfield
}
