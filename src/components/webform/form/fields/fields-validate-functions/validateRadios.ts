import { TFieldValidate } from '@/lib/types/components/validate'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import { object, ObjectSchema, string, StringSchema } from 'yup'

export const validateRadio = ({
  yupObject,
  defaultValues,
  key,
  field,
  required,
  valueFormat,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const options = field['#options']
  const optionKeys = Object.keys(options)

  const requiredMessage = getRequiredMessage(defaultFieldStateMessages, 'radio')

  let schema: StringSchema | ObjectSchema<Record<string, boolean>> =
    string().oneOf(optionKeys.concat(''))

  if (required) {
    schema = schema.required('required field')
  }

  const { radio: radioFormat } = valueFormat

  switch (radioFormat) {
    case 'key':
      schema = schema.transform((value: any) =>
        optionKeys.includes(value) ? value : ''
      )
      break
    case 'value':
      schema = schema.transform((value: any) => options[value] || '')
      break
    case 'keyValue':
      schema = schema.transform((value: any) =>
        optionKeys.includes(value) ? { [value]: options[value] } : {}
      )
      break
    case 'booleanMap':
      schema = object().test(
        'at-least-one-true',
        requiredMessage,
        (value) => value && Object.values(value).some((v) => v === true)
      ) as ObjectSchema<Record<string, boolean>>
      break
  }

  yupObject[key] = schema
  defaultValues[key] = defaultFieldValues.radio
}
