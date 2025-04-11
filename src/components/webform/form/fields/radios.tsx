import { string, object, StringSchema, ObjectSchema } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/components/validate'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TFormatFieldMulti, TWebformValueFormat } from '@/lib/types/form.d'
import Label from '@/components/webform/form/fields/fields-sub-components/label'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const renderRadio = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  valueFormat,
  classNames,
  components,
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
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldRadio'}
      components={components}
      stateError={fieldState.error}
      key={keyForMap}
    >
      <>
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
                  radioFormat as TFormatFieldMulti,
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
      </>
    </Wrapper>
  )
}

export const validateRadio = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  valueFormat,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const options = field['#options']
  const optionKeys = Object.keys(options)

  const requiredMessage = getRequiredMessage(defaultFieldStateMessages, 'radio')

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
        requiredMessage,
        (value) => value && Object.values(value).some((v) => v === true)
      ) as ObjectSchema<Record<string, boolean>>
      break
  }

  yupObject[key] = schema
  defaultValues[key] = defaultFieldValues.radio
}
