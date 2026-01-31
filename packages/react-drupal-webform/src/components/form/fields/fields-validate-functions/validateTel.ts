import { string } from 'yup'
import { TFieldValidate } from '../../../../lib/types/components/validate'
import {
  applyMinMaxLength,
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'
import { applyPatternIfApplicable } from '../../../../lib/functions/utils_functions'

export const validateTel = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    field,
    required,
    defaultFieldValues,
    requiredMessage,
    errorMessage,
    customValidators,
    minLengthMessage,
    maxLengthMessage,
  } = props

  if (field?.['#readonly']) {
    defaultValues[key] = defaultFieldValues.tel
    return
  }

  const type = field?.['#type'] as TDrupal_FieldType_Validate

  let defaultSchema = string()

  if (!field?.['#pattern']) {
    defaultSchema = defaultSchema.matches(/^[0-9]+$/, {
      message: errorMessage,
      excludeEmptyString: true,
    })
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
    ? (customSchema as any).required(requiredMessage)
    : customSchema

  defaultValues[key] = defaultFieldValues.tel
}
