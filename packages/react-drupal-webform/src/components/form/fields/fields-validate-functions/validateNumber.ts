import { TFieldValidate } from '../../../../lib/types/components/validate'
import { string } from 'yup'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'
import { applyPatternIfApplicable } from '../../../../lib/functions/utils_functions'

export const validateNumber = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    field,
    required,
    defaultFieldValues,
    requiredMessage,
    customValidators,
  } = props

  if (field?.['#readonly']) {
    defaultValues[key] = defaultFieldValues.number
    return
  }

  const type = field?.['#type'] as TDrupal_FieldType_Validate

  let defaultSchema = string()

  defaultSchema = applyPatternIfApplicable({
    schema: defaultSchema,
    field,
  })

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema

  defaultValues[key] = defaultFieldValues.number
}
