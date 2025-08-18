import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'

export const renderTextArea = (props: TFieldWebformObj) => {
  const { onBlur, key, field, classNames, components } = props
  const { control } = useFormContext()

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldTextarea'}
      components={components}
      stateError={fieldState.error}
      key={key}
      fieldKey={key}
    >
      <textarea
        id={key}
        className={cn(
          classNames.fields.textInputs.types.textarea,
          classNames.fields.textInputs.base,
          styles.field,
          styles.textarea,
          {
            [styles.error]: fieldState.error,
          }
        )}
        name={fieldController.name}
        minLength={field?.['#minlength']}
        maxLength={field?.['#maxlength']}
        rows={field?.['#rows'] ?? 10}
        placeholder={field?.['#placeholder']}
        onChange={(e) => fieldController.onChange?.(e)}
        value={fieldController.value ?? ''}
        onBlur={onBlur}
      />
    </Wrapper>
  )
}
