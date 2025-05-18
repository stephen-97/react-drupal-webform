import { TFieldValidate } from '@/lib/types/components/validate'
import { string } from 'yup'

export const validateNumber = ({
  yupObject,
  defaultValues,
  key,
  field,
  required,
  defaultFieldValues,
}: TFieldValidate) => {
  yupObject[key] = required ? string().required('required field') : string()

  defaultValues[key] = defaultFieldValues.number
}
