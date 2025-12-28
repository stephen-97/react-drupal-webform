import { string, StringSchema } from 'yup'
import { TFieldValidate } from '../../../../lib/types/components/validate'
import {
  applyMinMaxLength,
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'

export const validateTextField = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    required,
    defaultFieldValues,
    requiredMessage,
    field,
    customValidators,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate | undefined

  let baseSchema = string()

  baseSchema = applyMinMaxLength(baseSchema, field)

  if (required) {
    baseSchema = baseSchema.required(requiredMessage)
  }

  yupObject[key] =
    resolveCustomValidator<StringSchema<string | undefined>>(
      customValidators,
      key,
      type,
      props
    ) ?? baseSchema

  defaultValues[key] = defaultFieldValues.textfield
}
