import { TFieldValidate } from '@/lib/types/components/validate'
import { boolean } from 'yup'

export const validateCheckbox = ({
  yupObject,
  defaultValues,
  key,
  field,
  required,
  defaultFieldValues,
  requiredMessage,
}: TFieldValidate) => {
  yupObject[key] = required
    ? boolean().oneOf([true], requiredMessage)
    : boolean()

  defaultValues[key] =
    Boolean(field?.['#default_value']) ?? defaultFieldValues.checkbox
}
