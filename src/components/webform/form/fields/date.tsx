import { date } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'
import Label from '@/components/webform/form/fields/fields-sub-components/label'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderDate = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  classNames,
}: TFieldObj) => {
  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldInput'}
      key={keyForMap}
    >
      <input
        className={cn(styles.field, styles.input, {
          [styles.error]: fieldState.error,
        })}
        name={fieldController.name}
        minLength={field?.['#minlength']}
        maxLength={field?.['#maxlength']}
        placeholder={field?.['#placeholder']}
        type={'date'}
        onChange={(e) => fieldController.onChange?.(e)}
        value={fieldController?.value ?? ''}
        onBlur={onBlur}
      />
    </Wrapper>
  )
}

export const validateDate = ({
  yupObject,
  defaultValues,
  key,
  visibility,
  defaultFieldValues,
}: TFieldValidate) => {
  defaultValues[key] = defaultFieldValues.date
  const schema = date()
    .test('valid-date-format', 'Invalid date', (value) => {
      if (!value) return true

      return !isNaN(Date.parse(value.toString()))
    })
    .nullable()
    .typeError('Invalid date')

  yupObject[key] = visibility
    ? schema.required('This field is required')
    : schema.notRequired()
}
