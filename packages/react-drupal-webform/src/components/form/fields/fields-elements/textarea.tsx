import React, { ChangeEvent } from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { TextAreaProps } from '../../../../lib/types/components/textarea'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const Textarea = (props: TextAreaProps) => {
  const {
    fieldKey,
    field,
    className,
    innerProps,
    classNamePrefix,
    ariaDescribedBy,
    unstyled,
    onChange: onChangeProp,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
  } = props

  const { control } = useFormContext()

  const { field: fieldController } = useController({
    name: fieldKey,
    control,
  })

  const textareaClassNames = getClassNames({
    name: 'textarea',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.field, styles.textarea),
  })

  const dataAttributes = getDataAttributes({
    component: 'Textarea',
  })

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    fieldController.onChange(e)
    onChangeProp?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    fieldController.onBlur()
    onBlurProp?.(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onFocusProp?.(e)
  }

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
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      className={textareaClassNames}
      readOnly={field?.['#readonly']}
      aria-describedby={ariaDescribedBy}
      {...dataAttributes}
      {...props}
      {...innerProps}
    />
  )
}

export default React.memo(Textarea)
