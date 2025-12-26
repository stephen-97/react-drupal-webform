import { string } from 'yup'
import { TFieldValidate } from '../../../../lib/types/components/validate'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'

export const validateSelect = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    field,
    required,
    requiredMessage,
    customValidators,
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
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema
}
