import { string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TElementSource, TFieldObj } from '@/lib/types/field'

export const renderTextField = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
}: TFieldObj) => {
  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  return (
    <input
      className={cn(styles.field, styles.input)}
      name={fieldController.name}
      key={keyForMap}
      minLength={field?.['#minlength']}
      maxLength={field?.['#maxlength']}
      placeholder={field?.['#placeholder']}
      type={'text'}
      onChange={(e) => fieldController.onChange?.(e)}
      value={fieldController?.value ?? ''}
      onBlur={onBlur}
    />
  )
}

export const validateTextField = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
}: TFieldValidate) => {
  yupObject[key] = visibility ? string().required('required field') : string()

  defaultValues[key] = ''
}
