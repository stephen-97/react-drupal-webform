import { TFieldValidate } from '@/lib/types/components/validate'
import { string } from 'yup'

export const validateTextField = ({
  yupObject,
  defaultValues,
  key,
  required,
  defaultFieldValues,
  requiredMessage,
}: TFieldValidate) => {
  const message = (yupObject[key] = required
    ? string().required(requiredMessage)
    : string())

  defaultValues[key] = defaultFieldValues.textfield
}
