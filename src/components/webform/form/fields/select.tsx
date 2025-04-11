import { object, string, ObjectSchema } from 'yup'
import { TFieldValidate } from '@/lib/types/components/validate'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import { TFormatFieldMulti } from '@/lib/types/form.d'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import cn from 'classnames'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const renderSelect = ({
  control,
  key,
  keyForMap,
  field,
  valueFormat,
  classNames,
  components,
}: TFieldObj) => {
  const { field: fieldController, fieldState } = useController<any>({
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
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldSelect'}
      components={components}
      stateError={fieldState.error}
      key={keyForMap}
    >
      <select
        className={cn(styles.field)}
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
    </Wrapper>
  )
}

export const validateSelect = ({
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
    'select'
  )

  let schema: any = string().oneOf(optionKeys.concat(''))

  if (visibility) {
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

      if (visibility) {
        schema = schema.transform((value: any) =>
          optionKeys.includes(value) ? { [value]: options[value] } : {}
        )
      }
      defaultValues[key] = {}
      break
    case 'booleanMap':
      schema = object()

      if (visibility) {
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
