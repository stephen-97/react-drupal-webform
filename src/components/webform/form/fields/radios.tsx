import { string, object, StringSchema, ObjectSchema } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TWebformValueFormat } from '@/lib/types/form'

export const renderRadio = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  valueFormat,
}: TFieldObj) => {
  if (!field?.['#options']) {
    return null
  }

  const options: Record<string, string> = field['#options']
  const optionsObj: [string, string][] = Object.entries(options)

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  const { radio: radioFormat } = valueFormat

  return (
    <div key={keyForMap}>
      <div>{field?.['#title']}</div>
      {optionsObj.map(([key, value], i) => (
        <label key={i}>
          <input
            className={cn(styles.field, styles.input)}
            name={fieldController.name}
            type={'radio'}
            value={key}
            onChange={(e) =>
              handleChangeOptions(
                e,
                radioFormat,
                fieldController,
                options,
                optionsObj
              )
            }
            onBlur={onBlur}
          />
          <span>{value}</span>
        </label>
      ))}
    </div>
  )
}

export const validateRadio = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  valueFormat,
}: TFieldValidate) => {
  const options = field['#options']
  const optionKeys = Object.keys(options)

  let schema: StringSchema | ObjectSchema<Record<string, boolean>> =
    string().oneOf(optionKeys.concat(''))

  if (visibility) {
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
        'required field',
        (value) => value && Object.values(value).some((v) => v === true)
      ) as ObjectSchema<Record<string, boolean>>
      break
  }

  yupObject[key] = schema
  defaultValues[key] = ''
}
