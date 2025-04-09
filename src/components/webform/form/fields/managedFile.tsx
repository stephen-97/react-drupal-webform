import { string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'
import Label from '@/components/webform/form/fields/fields-sub-components/label'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderManagedFile = ({
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

  const fileExtensions = field?.['#file_extensions']
    ?.trim()
    .split(' ')
    .map((ext) => `.${ext}`)
    .join(', ')

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldInput'}
      key={keyForMap}
    >
      <input
        className={cn(styles.field, styles.input)}
        name={fieldController.name}
        minLength={field?.['#minlength']}
        maxLength={field?.['#maxlength']}
        placeholder={field?.['#placeholder']}
        type={'file'}
        accept={fileExtensions}
        onChange={(e) => fieldController.onChange?.(e)}
        value={fieldController?.value ?? ''}
        onBlur={onBlur}
      />
    </Wrapper>
  )
}

export const validateManagedFile = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  defaultFieldValues,
}: TFieldValidate) => {
  yupObject[key] = visibility ? string().required('required field') : string()

  defaultValues[key] = defaultFieldValues.textfield
}
