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

  const { select: selectFormat } = valueFormat

  let schema: any

  switch (selectFormat) {
    case 'key':
      schema = string()
        .oneOf(optionKeys.concat(''))
        .transform((value: any) => (optionKeys.includes(value) ? value : ''))
      if (required) {
        schema = schema.required(requiredMessage)
      }
      defaultValues[key] = ''
      break

    case 'value':
      const optionValues: string[] = Object.values(options)
      schema = string()
        .oneOf(optionValues.concat(''))
        .transform((value: any) => (optionValues.includes(value) ? value : ''))
      if (required) {
        schema = schema.required(requiredMessage)
      }
      defaultValues[key] = ''
      break

    case 'keyValue':
      schema = object().transform((value: any) => {
        const key = Object.keys(value || {})[0]
        if (optionKeys.includes(key)) {
          return value
        }
        return {}
      })
      if (required) {
        schema = schema.test(
          'valid-keyValue',
          requiredMessage,
          (value: any) => {
            if (!value || typeof value !== 'object') return false
            const key = Object.keys(value)[0]
            return key && optionKeys.includes(key)
          }
        )
      }
      defaultValues[key] = {}
      break

    case 'booleanMap':
      schema = object()
      if (required) {
        schema = schema.test(
          'at-least-one-true',
          requiredMessage,
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
