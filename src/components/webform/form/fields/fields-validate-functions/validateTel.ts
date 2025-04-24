import { TFieldValidate } from '@/lib/types/components/validate'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { string } from 'yup'

export const validateTel = ({
  yupObject,
  defaultValues,
  key,
  visibility,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(defaultFieldStateMessages, 'tel')

  const schema = string().matches(/^[0-9]+$/, {
    message: "it's not a number",
    excludeEmptyString: true,
  })
  yupObject[key] = visibility ? schema.required(requiredMessage) : schema

  defaultValues[key] = defaultFieldValues.tel
}
