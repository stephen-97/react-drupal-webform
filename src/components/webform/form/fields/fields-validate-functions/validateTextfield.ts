import { TFieldValidate } from '@/lib/types/components/validate'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { string } from 'yup'

export const validateTextField = ({
  yupObject,
  defaultValues,
  key,
  visibility,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(
    defaultFieldStateMessages,
    'textfield'
  )
  const message = (yupObject[key] = visibility
    ? string().required(requiredMessage)
    : string())

  defaultValues[key] = defaultFieldValues.textfield
}
