import { object, string, StringSchema, ObjectSchema } from 'yup'
import { TFieldValidate } from '@/lib/types/field'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'
import { TFormatFieldMulti } from '@/lib/types/form'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import cn from 'classnames'

export const renderSelect = ({
  control,
  key,
  keyForMap,
  field,
  valueFormat,
}: TFieldObj) => {
  const { field: fieldController } = useController<any>({
    name: key,
    control,
  })

  if (!field?.['#options']) {
    return null
  }
  const options: Record<string, string> = field['#options']
  const optionsObj: [string, string][] = Object.entries(options)
  const { select: selectFormat } = valueFormat

  return (
    <div key={keyForMap} className={cn(styles.fieldWrapper)}>
      <select
        className={cn(styles.field, ...(field?.['#attributes']?.class ?? []))}
        name={fieldController.name}
        onChange={(e) =>
          handleChangeOptions(
            e,
            selectFormat as TFormatFieldMulti,
            fieldController,
            options,
            optionsObj
          )
        }
      >
        {optionsObj.map(([key, value], i) => (
          <option key={i} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export const validateSelect = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  valueFormat,
  defaultFieldValues,
}: TFieldValidate) => {
  const options = field['#options']
  const optionKeys = Object.keys(options)

  let schema: StringSchema | ObjectSchema<Record<string, boolean>> =
    string().oneOf(optionKeys.concat(''))

  if (visibility) {
    schema = schema.required('required field')
  }

  const { select: selectFormat } = valueFormat

  switch (selectFormat) {
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
  defaultValues[key] = defaultFieldValues.select
}
