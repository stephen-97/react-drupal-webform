import { TFieldValidate } from '@/lib/types/components/validate'
import { string } from 'yup'

export const validateNumber = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  defaultFieldValues,
}: TFieldValidate) => {
  yupObject[key] = visibility ? string().required('required field') : string()

  defaultValues[key] = defaultFieldValues.number
}
