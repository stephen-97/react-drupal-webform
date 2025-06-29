import { string, object, mixed, StringSchema } from 'yup'
import { TFieldValidate } from '@/lib/types/components/validate'

export const validateRadio = ({
  yupObject,
  defaultValues,
  key,
  field,
  required,
  valueFormat,
  defaultFieldValues,
  requiredMessage,
}: TFieldValidate) => {
  const options = field['#options'] as Record<string, string>
  const optionKeys = Object.keys(options)
  const optionValues = Object.values(options)

  let schema

  switch (valueFormat.radios) {
    case 'key':
      schema = string()
      if (required) {
        schema = (schema as StringSchema)
          .oneOf(optionKeys, requiredMessage)
          .required(requiredMessage)
      } else {
        schema = (schema as StringSchema)
          .oneOf(['', ...optionKeys], requiredMessage)
          .notRequired()
      }
      break
    case 'value':
      schema = string()
      if (required) {
        schema = (schema as StringSchema)
          .oneOf(optionValues, requiredMessage)
          .required(requiredMessage)
      } else {
        schema = (schema as StringSchema)
          .oneOf(['', ...optionValues], requiredMessage)
          .notRequired()
      }
      break

    case 'keyValue':
      schema = mixed().test('valid-keyValue', requiredMessage, (val) => {
        if (!required && (val === '' || val == null)) {
          return true
        }
        if (typeof val !== 'object' || val === null) {
          return false
        }
        const keys = Object.keys(val as Record<string, any>)
        if (keys.length !== 1) {
          return false
        }
        const k = keys[0]
        return options[k] === (val as any)[k]
      })
      break

    case 'booleanMap':
      schema = object().test(
        'at-least-one-true',
        requiredMessage,
        (map) => Boolean(map) && Object.values(map).some((b) => b === true)
      )
      break

    default:
      schema = string()
  }

  if (required) {
    schema = schema.required(requiredMessage)
  }

  yupObject[key] = schema
  defaultValues[key] = defaultFieldValues.radios
}
