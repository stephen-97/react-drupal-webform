import { TFieldValidate } from '@/lib/types/components/validate'
import {
  formatMessage,
  getRequiredMessage,
} from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { object, ObjectSchema, string } from 'yup'

export const validateSelect = ({
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

  let schema: any = string().oneOf(optionKeys.concat(''))

  if (required) {
    schema = schema.required(requiredMessage)
  }

  const { select: selectFormat } = valueFormat

  switch (selectFormat) {
    case 'key':
      schema = schema.transform((value: any) =>
        optionKeys.includes(value) ? value : ''
      )
      defaultValues[key] = ''
      break
    case 'value':
      schema = schema.transform((value: any) => options[value] || '')
      defaultValues[key] = ''
      break
    case 'keyValue':
      schema = object()
      if (required) {
        schema = schema.transform((value: any) => {
          const key = Object.keys(value || {})[0]
          if (optionKeys.includes(key)) {
            return value
          }
          return {}
        })
      }
      defaultValues[key] = {}
      break
    case 'booleanMap':
      schema = object()

      if (required) {
        schema = schema.test(
          'at-least-one-true',
          'at-least-one-true',
          (value: Record<string, any>) =>
            value && Object.values(value).some((v) => v === true)
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

  yupObject[key] = schema
}
