import React from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { handleChangeOptions } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions'
import { SelectProps } from '../../../../lib/types/components/select'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const Select = ({
  fieldKey,
  field,
  innerProps,
  className,
  classNamePrefix,
  ariaDescribedBy,
  unstyled,
}: SelectProps) => {
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
    baseCn: cn(styles.select, className),
  })

  const optionClassNames = getClassNames({
    name: 'selectOption',
    prefix: classNamePrefix,
    unstyled: unstyled,
  })

  const dataAttributes = getDataAttributes({
    component: 'select',
  })

  return (
    <select
      id={fieldKey}
      name={fieldController.name}
      required={field?.['#required']}
      className={selectClassNames}
      value={fieldController.value ?? ''}
      onChange={(e) => handleChangeOptions(e.target.value, fieldController)}
      aria-describedby={ariaDescribedBy}
      {...dataAttributes}
      {...innerProps}
    >
      <option
        className={optionClassNames}
        value={field?.['#empty_value'] ?? ''}
      >
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
