import { string, object, mixed, StringSchema } from 'yup'
import { TFieldValidate } from "../../../../lib/types/components/validate"
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from "../../../../lib/functions/webform_validation_functions/webform_validation_functions"

export const validateRadio = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    field,
    required,
    valueFormat,
    defaultFieldValues,
    requiredMessage,
    customValidators,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate | undefined
  const options = field['#options'] as Record<string, string>
  const optionKeys = Object.keys(options)
  const optionValues = Object.values(options)

  let defaultSchema: any

  switch (valueFormat.radios) {
    case 'key':
      defaultSchema = string().oneOf(
        required ? optionKeys : ['', ...optionKeys],
        requiredMessage
      )
      break

    case 'value':
      defaultSchema = string().oneOf(
        required ? optionValues : ['', ...optionValues],
        requiredMessage
      )
      break

    case 'keyValue':
      defaultSchema = mixed().test('valid-keyValue', requiredMessage, (val) => {
        if (!required && (val === '' || val == null)) return true
        if (typeof val !== 'object' || val === null) return false
        const keys = Object.keys(val as Record<string, any>)
        if (keys.length !== 1) return false
        const k = keys[0]
        return options[k] === (val as any)[k]
      })
      break

    case 'booleanMap':
      defaultSchema = object().test(
        'at-least-one-true',
        requiredMessage,
        (map) => Boolean(map) && Object.values(map).some((b) => b === true)
      )
      break

    default:
      defaultSchema = string()
  }

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema

  defaultValues[key] = defaultFieldValues.radios
}
