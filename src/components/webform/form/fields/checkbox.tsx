import { boolean } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'

export const renderCheckbox = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  classNames,
}: TFieldObj) => {
  const title = field?.['#title']

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  return (
    <label
      key={keyForMap}
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        classNames.types[field['#type']],
        {
          [classNames.states.fieldError ?? '']: Boolean(fieldState.error),
        },
        classNames.general.fieldWrapper,

        styles.fieldWrapper
      )}
    >
      <input
        name={fieldController.name}
        checked={Boolean(fieldController.value)}
        type={'checkbox'}
        value={title}
        onChange={(e) => fieldController.onChange?.(e.target.checked)}
        onBlur={onBlur}
      />
      <span>{title}</span>
    </label>
  )
}

export const validateCheckbox = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  defaultFieldValues,
}: TFieldValidate) => {
  yupObject[key] = visibility
    ? boolean().oneOf([true], 'required field')
    : boolean()

  defaultValues[key] =
    Boolean(field?.['#default_value']) ?? defaultFieldValues.checkbox
}
