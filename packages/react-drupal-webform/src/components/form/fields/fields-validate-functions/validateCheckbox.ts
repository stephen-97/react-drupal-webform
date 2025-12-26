import { TFieldValidate } from "../../../../lib/types/components/validate"
import { boolean } from 'yup'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from "../../../../lib/functions/webform_validation_functions/webform_validation_functions"

export const validateCheckbox = (props: TFieldValidate) => {
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

  const type = field?.['#type'] as TDrupal_FieldType_Validate

  const defaultSchema = boolean()

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? customSchema.oneOf([true], requiredMessage)
    : customSchema.notRequired()

  defaultValues[key] =
    typeof field?.['#default_value'] !== 'undefined'
      ? Boolean(field?.['#default_value'])
      : defaultFieldValues.checkbox
}
