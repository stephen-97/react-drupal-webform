import { string } from 'yup'
import { TFieldValidate } from '../../../../lib/types/components/validate'
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from '../../../../lib/functions/webform_validation_functions/webform_validation_functions'

export const validateRadio = (props: TFieldValidate) => {
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

  const type = field?.['#type'] as TDrupal_FieldType_Validate | undefined
  const options = field['#options'] as Record<string, string>
  const optionKeys = Object.keys(options)

  const defaultSchema = string().oneOf(
    required ? optionKeys : ['', ...optionKeys],
    requiredMessage
  )

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema

  defaultValues[key] = defaultFieldValues.radios
}
