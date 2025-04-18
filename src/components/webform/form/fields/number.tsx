import { string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderNumber = ({
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
      stateError={fieldState.error}
      key={keyForMap}
    >
      <input
        className={cn(
          styles.field,
          styles.input,
          ...(field?.['#attributes']?.class ?? []),
          { [styles.error]: fieldState.error }
        )}
        name={fieldController.name}
        minLength={field?.['#minlength']}
        maxLength={field?.['#maxlength']}
        max={field?.['#max']}
        min={field?.['#min']}
        placeholder={field?.['#placeholder']}
        type={'number'}
        onChange={(e) => fieldController.onChange?.(e)}
        value={fieldController?.value ?? ''}
        onBlur={onBlur}
      />
    </Wrapper>
  )
}

export const validateNumber = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  defaultFieldValues,
}: TFieldValidate) => {
  yupObject[key] = visibility ? string().required('required field') : string()

  defaultValues[key] = defaultFieldValues.number
}
