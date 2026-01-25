import { TFieldValidate } from '../../../../lib/types/components/validate'
import { date, string } from 'yup'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'
import { applyPatternIfApplicable } from '../../../../lib/functions/utils_functions'

export const validateDate = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    required,
    defaultFieldValues,
    requiredMessage,
    errorMessage,
    customValidators,
    field,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate

  let defaultSchema

  if (field?.['#pattern']) {
    defaultSchema = string()

    defaultSchema = applyPatternIfApplicable({
      schema: defaultSchema,
      field,
      fallbackMessage: errorMessage,
    })
  } else {
    defaultSchema = date()
      .test('valid-date-format', 'Invalid date', (value) => {
        if (!value) return true
        return !isNaN(Date.parse(value.toString()))
      })
      .nullable()
      .typeError(errorMessage)
  }

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : (customSchema as any).notRequired()

  defaultValues[key] = defaultFieldValues.date
}
