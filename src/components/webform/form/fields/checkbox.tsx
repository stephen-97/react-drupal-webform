import { boolean } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldValidate } from '@/lib/types/components/validate'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import { getRequiredMessage } from '@/lib/functions/webform_validation_functions/webform_validation_functions'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderCheckbox = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  classNames,
  components,
}: TFieldObj) => {
  const title = field?.['#title']

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldCheckboxes'}
      stateError={fieldState.error}
      key={keyForMap}
      components={components}
    >
      <>
        <input
          name={fieldController.name}
          checked={Boolean(fieldController.value)}
          type={'checkbox'}
          value={title}
          onChange={(e) => fieldController.onChange?.(e.target.checked)}
          onBlur={onBlur}
        />
        <span>{title}</span>
      </>
    </Wrapper>
  )
}

export const validateCheckbox = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
  defaultFieldValues,
  defaultFieldStateMessages,
}: TFieldValidate) => {
  const requiredMessage = getRequiredMessage(
    defaultFieldStateMessages,
    'checkbox'
  )

  yupObject[key] = visibility
    ? boolean().oneOf([true], requiredMessage)
    : boolean()

  defaultValues[key] =
    Boolean(field?.['#default_value']) ?? defaultFieldValues.checkbox
}
