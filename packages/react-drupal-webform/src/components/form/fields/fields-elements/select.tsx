import React, { ChangeEvent } from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { handleChangeOptions } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions'
import { SelectProps } from '../../../../lib/types/components/select'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const Select = (props: SelectProps) => {
  const {
    fieldKey,
    field,
    innerProps,
    className,
    classNamePrefix,
    ariaDescribedBy,
    unstyled,
    onChange: onChangeProp,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
  } = props

  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const { field: fieldController } = useController({
    name: fieldKey,
    control,
  })

  const optionsObj = Object.entries(field['#options'] as Record<string, string>)

  const options = field['#sort_options']
    ? [...optionsObj].sort(([, labelA], [, labelB]) =>
        String(labelA).localeCompare(String(labelB), undefined, {
          sensitivity: 'base',
        })
      )
    : optionsObj

  const selectClassNames = getClassNames({
    name: 'select',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.select),
  })

  const optionClassNames = getClassNames({
    name: 'selectOption',
    prefix: classNamePrefix,
    unstyled: unstyled,
  })

  const dataAttributes = getDataAttributes({
    component: 'select',
  })

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    handleChangeOptions(value, fieldController)
    onChangeProp?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    fieldController.onBlur()
    onBlurProp?.(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    onFocusProp?.(e)
  }

  return (
    <select
      id={fieldKey}
      name={fieldController.name}
      required={field?.['#required']}
      className={selectClassNames}
      value={fieldController.value ?? ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      aria-describedby={ariaDescribedBy}
      {...dataAttributes}
      {...props}
      {...innerProps}
    >
      <option className={optionClassNames} value={''}>
        {field?.['#empty_option'] ?? '-- Select an option --'}
      </option>

      {options.map(([optionKey, optionValue]) => (
        <option key={optionKey} className={optionClassNames} value={optionKey}>
          {optionValue}
        </option>
      ))}
    </select>
  )
}

export default React.memo(Select)
