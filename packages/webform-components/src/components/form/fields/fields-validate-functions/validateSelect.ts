import { object, ObjectSchema, string } from 'yup'
import { TFieldValidate } from "../../../../lib/types/components/validate"
import {
  resolveCustomValidator,
  TDrupal_FieldType_Validate,
} from "../../../../lib/functions/webform_validation_functions/webform_validation_functions"

export const validateSelect = (props: TFieldValidate) => {
  const {
    yupObject,
    defaultValues,
    key,
    field,
    required,
    valueFormat,
    requiredMessage,
    customValidators,
  } = props

  const type = field?.['#type'] as TDrupal_FieldType_Validate
  const options = field['#options']
  const optionKeys = Object.keys(options)

  let defaultSchema: any

  switch (valueFormat.select) {
    case 'key':
      defaultSchema = string()
        .oneOf(optionKeys.concat(''))
        .transform((value: any) => (optionKeys.includes(value) ? value : ''))
      defaultValues[key] = ''
      break

    case 'value':
      const optionValues: string[] = Object.values(options)
      defaultSchema = string()
        .oneOf(optionValues.concat(''))
        .transform((value: any) => (optionValues.includes(value) ? value : ''))
      defaultValues[key] = ''
      break

    case 'keyValue':
      defaultSchema = object().transform((value: any) => {
        const k = Object.keys(value || {})[0]
        return optionKeys.includes(k) ? value : {}
      })
      defaultValues[key] = {}
      break

    case 'booleanMap':
      defaultSchema = object()
      defaultValues[key] = optionKeys.reduce(
        (acc, key) => {
          acc[key] = false
          return acc
        },
        {} as Record<string, boolean>
      )
      break

    default:
      defaultSchema = string()
      defaultValues[key] = ''
  }

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? defaultSchema

  yupObject[key] = required
    ? (customSchema as any).required(requiredMessage)
    : customSchema
}
