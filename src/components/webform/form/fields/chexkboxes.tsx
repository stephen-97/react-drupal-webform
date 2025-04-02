import { string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TElementSource, TFieldObj } from '@/lib/types/field'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TFormatFieldMulti } from '@/lib/types/form'

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
    <div key={keyForMap}>
      <div>{field?.['#title']}</div>
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
                'keyValue',
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
  )
}

export const validateCheckboxes = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
}: TFieldValidate) => {
  let schema = string().oneOf(Object.keys(field['#options']).concat(''))

  schema = schema.required('required')

  yupObject[key] = visibility ? string().required('required field') : string()

  defaultValues[key] = ''
}
