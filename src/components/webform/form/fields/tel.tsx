import { string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'
import Label from '@/components/webform/form/fields/fields-sub-components/label'

export const renderTel = ({
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
    <div key={keyForMap} className={cn(styles.fieldWrapper)}>
      <Label title={field?.['#title']} />
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
        placeholder={field?.['#placeholder']}
        type={'tel'}
        onChange={(e) => fieldController.onChange?.(e)}
        value={fieldController?.value ?? ''}
        onBlur={onBlur}
      />
    </div>
  )
}

export const validateTel = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  defaultFieldValues,
}: TFieldValidate) => {
  yupObject[key] = visibility ? string().required('required field') : string()

  const schema = string().matches(/^[0-9]+$/, {
    message: "it's not a number",
    excludeEmptyString: true,
  })
  yupObject[key] = visibility ? schema.required() : schema

  defaultValues[key] = defaultFieldValues.tel
}
