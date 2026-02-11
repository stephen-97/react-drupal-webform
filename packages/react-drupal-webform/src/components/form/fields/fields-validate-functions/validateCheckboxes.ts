import { FieldValidateProps } from '../../../../lib/types/components/validate'
import { array, string } from 'yup'
import { resolveCustomValidator } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'
import { TDrupal_FieldType_Validate } from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'

export const validateCheckboxes = (props: FieldValidateProps) => {
  const {
    yupObject,
    defaultValues,
    key,
    field,
    required,
    requiredMessage,
    rhfCustomValidators,
    defaultFieldValues,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate
  const options = field['#options']
  const optionKeys = Object.keys(options)

  let schema = array()
    .of(string().oneOf(optionKeys))
    .default(() => [])

  if (required) schema = schema.min(1, requiredMessage)
  defaultValues[key] = defaultFieldValues.checkboxes

  const customSchema =
    resolveCustomValidator(rhfCustomValidators, key, type, props) ?? schema

  yupObject[key] = required
    ? customSchema.required(requiredMessage)
    : customSchema.notRequired()
}
