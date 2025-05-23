import { TFieldValidate } from '@/lib/types/components/validate'
import { array, object, ObjectSchema, string } from 'yup'

export const validateCheckboxes = ({
  yupObject,
  defaultValues,
  key,
  field,
  required,
  valueFormat,
  requiredMessage,
}: TFieldValidate) => {
  const options = field['#options']
  const optionKeys = Object.keys(options)

  const { checkboxes: checkboxesFormat } = valueFormat

  let schema: any

  switch (checkboxesFormat) {
    case 'key':
      schema = array()
        .of(string().oneOf(optionKeys))
        .default(() => [])
      if (required) {
        schema = schema.min(1, requiredMessage)
      }
      defaultValues[key] = ''
      break

    case 'value':
      schema = array()
        .of(string().oneOf(optionKeys))
        .default(() => [])
      if (required) {
        schema = schema.min(1, requiredMessage)
      }
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

      if (required) {
        schema = schema.min(1, requiredMessage)
      }
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
        (acc, key) => {
          acc[key] = false
          return acc
        },
        {} as Record<string, boolean>
      )
      break
  }

  if (required) {
    schema = schema.required(requiredMessage)
  }

  yupObject[key] = schema
}
