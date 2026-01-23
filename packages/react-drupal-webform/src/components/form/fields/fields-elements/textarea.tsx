import React from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { TextAreaProps } from '../../../../lib/types/components/textarea'
import {
  getAriaDescribedBy,
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const Textarea = ({
  fieldKey,
  field,
  onBlur,
  className,
  innerProps,
  classNamePrefix,
  ariaDescribedBy,
}: TextAreaProps) => {
  const { control } = useFormContext()

  const { field: fieldController } = useController({
    name: fieldKey,
    control,
  })

  const textareaClassNames = getClassNames({
    name: 'textarea',
    prefix: classNamePrefix,
    baseCn: cn(styles.field, styles.textarea, className),
  })

  const dataAttributes = getDataAttributes({
    component: 'Textarea',
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
      className={textareaClassNames}
      aria-describedby={ariaDescribedBy}
      {...dataAttributes}
      {...innerProps}
    />
  )
}

export default React.memo(Textarea)
