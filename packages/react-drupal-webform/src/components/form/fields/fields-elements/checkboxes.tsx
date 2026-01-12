import React from 'react'
import cn from 'classnames'
import styles from '../field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { handleChangeOptionsCheckboxes } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions'
import { CheckboxesProps } from '../../../../lib/types/components/checkboxes'

const Checkboxes = ({
  fieldKey,
  field,
  classNames,
  className,
  innerProps,
  itemProps,
  inputProps,
  labelProps,
}: CheckboxesProps) => {
  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const optionsObj = Object.entries(field['#options'] as Record<string, string>)

  const { field: fieldController } = useController<any>({
    name: fieldKey,
    control,
  })

  return (
    <div
      className={cn(
        classNames.fields.checkboxes?.groupWrapper,
        styles.checkboxes,
        className
      )}
      role="group"
      {...innerProps}
    >
      {optionsObj.map(([optionKey, optionValue], i) => {
        const checked = Array.isArray(fieldController.value)
          ? fieldController.value.includes(optionKey)
          : false

        const id = `checkboxes-${optionKey.trim()}-${i}`

        return (
          <div
            key={optionKey}
            className={cn(
              classNames.fields.checkboxes?.itemWrapper,
              styles.checkbox
            )}
            {...itemProps}
          >
            <input
              id={id}
              className={cn(classNames.fields.checkboxes?.input, styles.field)}
              name={fieldController.name}
              type="checkbox"
              value={optionKey}
              checked={checked}
              onChange={(e) =>
                handleChangeOptionsCheckboxes(
                  e.target.value,
                  e.target.checked,
                  fieldController
                )
              }
              {...inputProps}
            />

            <label
              htmlFor={id}
              className={cn(
                classNames.fields.checkboxes?.label,
                styles.labelCheckbox
              )}
              {...labelProps}
            >
              {optionValue}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(Checkboxes)
