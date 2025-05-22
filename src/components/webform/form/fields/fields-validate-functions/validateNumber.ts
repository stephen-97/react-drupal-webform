import { TFieldValidate } from '@/lib/types/components/validate'
import { string } from 'yup'

export const validateNumber = ({
  yupObject,
  defaultValues,
  key,
  required,
  defaultFieldValues,
  requiredMessage,
}: TFieldValidate) => {
  yupObject[key] = required ? string().required(requiredMessage) : string()

  defaultValues[key] = defaultFieldValues.number
}
