import { string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'

export const renderRadio = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
}: TFieldObj) => {
  if (!field?.['#options']) {
    return null
  }

  const options: Record<string, string> = field['#options']

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  return (
    <div key={keyForMap}>
      <div>{field?.['#title']}</div>
      {Object.entries(options).map(([key, value], i) => (
        <label key={i}>
          <input
            className={cn(styles.field, styles.input)}
            name={fieldController.name}
            type={'radio'}
            onChange={(e) => fieldController.onChange?.(e)}
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
}: TFieldValidate) => {
  let schema = string().oneOf(Object.keys(field['#options']).concat(''))

  schema = schema.required('required')

  yupObject[key] = visibility ? string().required('required field') : string()

  defaultValues[key] = ''
}
