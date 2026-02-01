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
import { TElementSource } from '../../../../lib/types'

const Input = (props: InputProps) => {
  const {
    fieldKey,
    field,
    classNamePrefix,
    className,
    innerProps,
    unstyled,
    validationMode,
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

  const applyWebformNativeValidation = (
    input: HTMLInputElement,
    field?: TElementSource
  ) => {
    input.setCustomValidity('')

    if (input.validity.valid) {
      return
    }

    if (input.validity.patternMismatch && field?.['#pattern_error']) {
      input.setCustomValidity(field['#pattern_error'])
      return
    }

    if (input.validity.valueMissing && field?.['#required_error']) {
      input.setCustomValidity(field['#required_error'])
      return
    }
  }

  const resetWebformNativeValidation = (input: HTMLInputElement) => {
    if (validationMode !== 'htmlNative') return
    input.setCustomValidity('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (validationMode === 'htmlNative') {
      resetWebformNativeValidation(e.currentTarget)
    }

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

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    if (validationMode !== 'htmlNative') return
    applyWebformNativeValidation(e.currentTarget, field)
  }

  return (
    <input
      id={fieldKey}
      className={inputClassNames}
      name={fieldController.name}
      type={getFieldType}
      value={fieldController.value ?? ''}
      readOnly={field?.['#readonly']}
      aria-describedby={ariaDescribedBy}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onInvalid={handleInvalid}
      {...inputFieldAttributes}
      {...dataAttributes}
      {...innerProps}
    />
  )
}

export default React.memo(Input)
