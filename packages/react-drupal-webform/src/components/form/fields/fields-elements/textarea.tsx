import React from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { TextAreaProps } from '../../../../lib/types/components/textarea'

const Textarea = ({
  fieldKey,
  field,
  classNames,
  onBlur,
  className,
  innerProps,
}: TextAreaProps) => {
  const { control } = useFormContext()

  const { field: fieldController, fieldState } = useController({
    name: fieldKey,
    control,
  })

  return (
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
        className,
        { [styles.error]: fieldState?.error }
      )}
      {...innerProps}
    />
  )
}

export default React.memo(Textarea)
