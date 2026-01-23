import React, { HTMLInputTypeAttribute } from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { InputProps } from '../../../../lib/types/components/input'
import {
  getAriaDescribedBy,
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const Input = (props: InputProps) => {
  const { fieldKey, field, classNamePrefix, className, innerProps } = props
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
    baseCn: cn(styles.input, className),
  })

  const dataAttributes = getDataAttributes({
    component: 'Input',
  })

  const ariaDescribedBy = getAriaDescribedBy({ fieldKey, field })

  return (
    <input
      id={fieldKey}
      className={inputClassNames}
      name={fieldController.name}
      minLength={field?.['#minlength']}
      maxLength={field?.['#maxlength']}
      placeholder={field?.['#placeholder']}
      type={getFieldType}
      onChange={(e) => fieldController.onChange(e)}
      value={fieldController.value ?? ''}
      required={field?.['#required']}
      aria-describedby={ariaDescribedBy}
      {...dataAttributes}
      {...innerProps}
    />
  )
}

export default React.memo(Input)
