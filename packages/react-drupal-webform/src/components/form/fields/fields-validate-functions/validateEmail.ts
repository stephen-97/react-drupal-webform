import { TFieldValidate } from '../../../../lib/types/components/validate'
import { string } from 'yup'
import {
  applyMinMaxLength,
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'
import { applyPatternIfApplicable } from '../../../../lib/functions/utils_functions'

export const validateEmail = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    required,
    defaultFieldValues,
    errorMessage,
    requiredMessage,
    customValidators,
    minLengthMessage,
    maxLengthMessage,
    field,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate

  let defaultSchema = string()
  if (!field?.['#pattern']) {
    const emailWithTLDRegex = /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/

    defaultSchema = defaultSchema
      .test(
        'valid-email-format',
        errorMessage,
        (v) => !v || emailWithTLDRegex.test(v)
      )
      .email(errorMessage)
  }

  defaultSchema = applyMinMaxLength(
    defaultSchema,
    field,
    minLengthMessage,
    maxLengthMessage
  )

  defaultSchema = applyPatternIfApplicable({
    schema: defaultSchema,
    field,
    fallbackMessage: errorMessage,
  })

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? customSchema.required(requiredMessage)
    : customSchema.notRequired()

  defaultValues[key] = defaultFieldValues.email
}
