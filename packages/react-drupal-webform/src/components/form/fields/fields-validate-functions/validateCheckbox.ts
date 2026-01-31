import { TFieldValidate } from '../../../../lib/types/components/validate'
import { boolean } from 'yup'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'

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

  const baseSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? boolean()

  if (required) {
    yupObject[key] = baseSchema.test(
      'is-checked',
      requiredMessage,
      (value) => value === true
    )
  } else {
    yupObject[key] = baseSchema.notRequired()
  }

  defaultValues[key] = defaultFieldValues.checkbox
}
