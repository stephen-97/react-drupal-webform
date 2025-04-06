import {
  AnyObject,
  array,
  ArraySchema,
  boolean,
  object,
  ObjectSchema,
  string,
} from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TElementSource, TFieldObj } from '@/lib/types/field'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TFormatFieldMulti } from '@/lib/types/form'
import Label from '@/components/webform/form/fields/fields-sub-components/label'

export const renderCheckboxes = ({
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

  const { checkboxes: checkboxesFormat } = valueFormat

  return (
    <div
      key={keyForMap}
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        styles.fieldWrapper
      )}
    >
      <Label title={field?.['#title']} />
      <div className={styles.checkboxes}>
        {optionsObj.map(([key, value], i) => (
          <label key={i}>
            <input
              className={cn(styles.field, styles.input)}
              name={fieldController.name}
              type={'checkbox'}
              value={key}
              onChange={(e) =>
                handleChangeOptions(
                  e,
                  checkboxesFormat as TFormatFieldMulti,
                  fieldController,
                  options,
                  optionsObj,
                  'checkboxes'
                )
              }
              onBlur={onBlur}
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export const validateCheckboxes = ({
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

  const { checkboxes: checkboxesFormat } = valueFormat

  let schema: any

  switch (checkboxesFormat) {
    case 'key':
      schema = array()
        .of(string().oneOf(optionKeys))
        .default(() => [])
      if (visibility) {
        schema = schema.min(1)
      }
      break

    case 'value':
      schema = array()
        .of(string().oneOf(optionKeys))
        .default(() => [])
      if (visibility) {
        schema = schema.min(1)
      }
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

      if (visibility) {
        schema = schema.min(1)
      }
      break

    case 'booleanMap':
      schema = object().test(
        'at-least-one-true',
        'required field',
        (value) => value && Object.values(value).some((v) => v === true)
      ) as ObjectSchema<Record<string, boolean>>
      break
  }

  if (visibility) {
    schema = schema.required('required field')
  }

  yupObject[key] = schema
  defaultValues[key] = defaultFieldValues.checkboxes
}
