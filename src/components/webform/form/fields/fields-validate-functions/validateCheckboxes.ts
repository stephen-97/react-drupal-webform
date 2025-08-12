import { TFieldValidate } from '@/lib/types/components/validate'
import { array, object, ObjectSchema, string, AnySchema } from 'yup'
import { resolveCustomValidator } from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { TDrupal_FieldType_Validate } from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const validateCheckboxes = (props: TFieldValidate) => {
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
  const { checkboxes: checkboxesFormat } = valueFormat

  let schema: any

  switch (checkboxesFormat) {
    case 'key':
    case 'value':
      schema = array()
        .of(string().oneOf(optionKeys))
        .default(() => [])
      if (required) schema = schema.min(1, requiredMessage)
      defaultValues[key] = ''
      break

    case 'keyValue':
      schema = array()
        .of(
          object({
            key: string().oneOf(optionKeys),
            value: string(),
          })
        )
        .default(() => [])
      if (required) schema = schema.min(1, requiredMessage)
      defaultValues[key] = []
      break

    case 'booleanMap':
      schema = object()
      if (required) {
        schema = object().test(
          'at-least-one-true',
          requiredMessage,
          (value) => value && Object.values(value).some((v) => v === true)
        ) as ObjectSchema<Record<string, boolean>>
      }
      defaultValues[key] = optionKeys.reduce(
        (acc, optKey) => {
          acc[optKey] = false
          return acc
        },
        {} as Record<string, boolean>
      )
      break

    default:
      schema = array().default(() => [])
      defaultValues[key] = []
      break
  }

  const customSchema =
    resolveCustomValidator(customValidators, key, type, props) ?? schema

  yupObject[key] = required
    ? customSchema.required(requiredMessage)
    : customSchema.notRequired()
}
