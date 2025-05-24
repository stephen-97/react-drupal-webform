import { TFieldValidate } from '@/lib/types/components/validate'
import { string } from 'yup'

export const validateTel = ({
  yupObject,
  defaultValues,
  key,
  required,
  defaultFieldValues,
  requiredMessage,
  errorMessage,
}: TFieldValidate) => {
  const schema = string().matches(/^[0-9]+$/, {
    message: errorMessage,
    excludeEmptyString: true,
  })
  yupObject[key] = required ? schema.required(requiredMessage) : schema

  defaultValues[key] = defaultFieldValues.tel
}
