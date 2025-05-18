import cn from 'classnames'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderTextArea = ({
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
      classNameFieldName={'fieldTextarea'}
      components={components}
      stateError={fieldState.error}
      key={keyForMap}
    >
      <textarea
        className={cn(
          classNames.textInputs.types.textarea,
          classNames.textInputs.base,
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
