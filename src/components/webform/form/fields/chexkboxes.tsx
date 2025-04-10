import { array, object, ObjectSchema, string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TFormatFieldMulti } from '@/lib/types/form.d'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const renderCheckboxes = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  valueFormat,
  classNames,
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
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldCheckboxes'}
      stateError={fieldState.error}
      key={keyForMap}
    >
      <div className={styles.checkboxes}>
        {optionsObj.map(([key, value], i) => (
          <label className={styles.checkbox} key={i}>
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
    </Wrapper>
  )
}

export const validateCheckboxes = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  valueFormat,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const options = field['#options']
  const optionKeys = Object.keys(options)
  const requiredMessage = getRequiredMessage(
    defaultFieldStateMessages,
    'checkboxes'
  )

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
      defaultValues[key] = ''
      break

    case 'value':
      schema = array()
        .of(string().oneOf(optionKeys))
        .default(() => [])
      if (visibility) {
        schema = schema.min(1)
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

      if (visibility) {
        schema = schema.min(1)
      }
      defaultValues[key] = []
      break

    case 'booleanMap':
      schema = object()

      if (visibility) {
        schema = object().test(
          'at-least-one-true',
          'required field',
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

  if (visibility) {
    schema = schema.required(requiredMessage)
  }

  yupObject[key] = schema
}
