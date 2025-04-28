import { TFieldValidate } from '@/lib/types/components/validate'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { boolean } from 'yup'

export const validateCheckbox = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(
    defaultFieldStateMessages,
    'checkbox'
  )

  yupObject[key] = visibility
    ? boolean().oneOf([true], requiredMessage)
    : boolean()

  defaultValues[key] =
    Boolean(field?.['#default_value']) ?? defaultFieldValues.checkbox
}
