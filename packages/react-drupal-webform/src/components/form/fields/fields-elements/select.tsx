import React from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { handleChangeOptions } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions'
import { SelectProps } from '../../../../lib/types/components/select'

const Select = ({
  fieldKey,
  field,
  classNames,
  innerProps,
  className,
}: SelectProps) => {
  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const { field: fieldController, fieldState } = useController({
    name: fieldKey,
    control,
  })

  const optionsObj = Object.entries(field['#options'] as Record<string, string>)

  return (
    <select
      id={fieldKey}
      name={fieldController.name}
      required={field?.['#required']}
      className={cn(
        classNames.fields.select?.select,
        styles.field,
        styles[field?.['#type']],
        className,
        { [styles.error]: fieldState?.error }
      )}
      value={fieldController.value ?? ''}
      onChange={(e) => handleChangeOptions(e.target.value, fieldController)}
      {...innerProps}
    >
      <option className={classNames.fields.select.option} value="">
        {field?.['#placeholder'] ?? '-- Select an option --'}
      </option>

      {optionsObj.map(([optionKey, optionValue]) => (
        <option
          key={optionKey}
          className={classNames.fields.select.option}
          value={optionKey}
        >
          {optionValue}
        </option>
      ))}
    </select>
  )
}

export default React.memo(Select)
