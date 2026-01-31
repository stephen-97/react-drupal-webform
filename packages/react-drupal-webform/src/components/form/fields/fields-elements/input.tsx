import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { InputProps } from '../../../../lib/types/components/input'
import {
  getAriaDescribedBy,
  getClassNames,
  getDataAttributes,
  getTextLikeInputAttributes,
} from '../../../../lib/functions/utils_functions'

const Input = (props: InputProps) => {
  const {
    fieldKey,
    field,
    classNamePrefix,
    className,
    innerProps,
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
  const getFieldType: HTMLInputTypeAttribute = (() => {
    switch (field?.['#type']) {
      case 'textfield':
        return 'text'
      case 'date':
        return 'date'
      case 'number':
        return 'number'
      case 'email':
        return 'email'
      case 'tel':
        return 'tel'
      default:
        return 'text'
    }
  })()

  const inputClassNames = getClassNames({
    name: 'input',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.input),
  })

  const dataAttributes = getDataAttributes({
    component: 'Input',
  })

  const ariaDescribedBy = getAriaDescribedBy({ fieldKey, field })

  const inputFieldAttributes = getTextLikeInputAttributes(field, getFieldType)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    fieldController.onChange(e)
    onChangeProp?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    fieldController.onBlur()
    onBlurProp?.(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocusProp?.(e)
  }

  return (
    <input
      id={fieldKey}
      className={inputClassNames}
      name={fieldController.name}
      type={getFieldType}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={fieldController.value ?? ''}
      aria-describedby={ariaDescribedBy}
      readOnly={field?.['#readonly']}
      {...inputFieldAttributes}
      {...dataAttributes}
      {...innerProps}
    />
  )
}

export default React.memo(Input)
