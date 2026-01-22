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
  classNames,
  innerProps,
  className,
  classNamePrefix,
}: SelectProps) => {
  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const { field: fieldController } = useController({
    name: fieldKey,
    control,
  })

  const optionsObj = Object.entries(field['#options'] as Record<string, string>)

  const selectClassNames = getClassNames({
    name: 'select',
    prefix: classNamePrefix,
    baseCn: cn(styles.select, className),
  })

  const optionClassNames = getClassNames({
    name: 'selectOption',
    prefix: classNamePrefix,
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
      {...dataAttributes}
      {...innerProps}
    >
      <option className={optionClassNames} value="">
        {field?.['#placeholder'] ?? '-- Select an option --'}
      </option>

      {optionsObj.map(([optionKey, optionValue]) => (
        <option key={optionKey} className={optionClassNames} value={optionKey}>
          {optionValue}
        </option>
      ))}
    </select>
  )
}

export default React.memo(Select)
