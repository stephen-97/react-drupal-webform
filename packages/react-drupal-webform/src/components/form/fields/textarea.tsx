import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'

export const renderTextArea = (props: TFieldWebformObj) => {
  const { onBlur, fieldKey, field, classNames, components } = props
  const { control } = useFormContext()

  const CustomTextArea =
    components?.fieldById?.[fieldKey] ?? components?.textarea

  const controller = useController<any>({ name: fieldKey, control })
  const { field: fieldController, fieldState } = controller

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldTextarea"
      components={components}
      stateError={fieldState?.error}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomTextArea ? (
        // ✅ On passe tout le controller
        <CustomTextArea {...props} />
      ) : (
        <textarea
          id={fieldKey}
          name={fieldController.name}
          minLength={field?.['#minlength']}
          maxLength={field?.['#maxlength']}
          rows={field?.['#rows'] ?? 10}
          placeholder={field?.['#placeholder']}
          required={field?.['#required']}
          value={fieldController.value ?? ''}
          onChange={(e) => fieldController.onChange(e.target.value)}
          onBlur={onBlur}
          className={cn(
            classNames.fields.textInputs.types.textarea,
            classNames.fields.textInputs.base,
            styles.field,
            styles.textarea,
            { [styles.error]: fieldState?.error }
          )}
        />
      )}
    </Wrapper>
  )
}
