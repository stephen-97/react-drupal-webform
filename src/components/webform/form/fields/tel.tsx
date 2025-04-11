import { string } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/components/validate'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Label from '@/components/webform/form/fields/fields-sub-components/label'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'

export const renderTel = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  classNames,
  components,
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
      components={components}
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
        placeholder={field?.['#placeholder']}
        type={'tel'}
        onChange={(e) => fieldController.onChange?.(e)}
        value={fieldController?.value ?? ''}
        onBlur={onBlur}
      />
    </Wrapper>
  )
}

export const validateTel = ({
  yupObject,
  defaultValues,
  key,
  visibility,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(defaultFieldStateMessages, 'tel')

  const schema = string().matches(/^[0-9]+$/, {
    message: "it's not a number",
    excludeEmptyString: true,
  })
  yupObject[key] = visibility ? schema.required(requiredMessage) : schema

  defaultValues[key] = defaultFieldValues.tel
}
