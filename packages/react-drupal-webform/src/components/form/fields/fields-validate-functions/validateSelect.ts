import { string } from 'yup'
import { FieldValidateProps } from '../../../../lib/types/components/validate'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'

export const validateSelect = (props: FieldValidateProps) => {
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

  const defaultSchema = string()
    .oneOf(optionKeys.concat(''))
    .transform((value: any) => (optionKeys.includes(value) ? value : ''))

  defaultValues[key] = field?.['#default_value'] ?? defaultFieldValues.select

  const customSchema =
    resolveCustomValidator(rhfCustomValidators, key, type, props) ??
    defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema
}
