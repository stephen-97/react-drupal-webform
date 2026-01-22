import React from 'react'
import cn from 'classnames'
import styles from '../field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { handleChangeOptionsCheckboxes } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions'
import { CheckboxesProps } from '../../../../lib/types/components/checkboxes'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const Checkboxes = ({
  fieldKey,
  field,
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

  const wrapperClassNames = getClassNames({
    name: 'checkboxesWrapper',
    baseCn: cn(styles.checkboxes, className),
  })

  const itemClassNames = getClassNames({
    name: 'checkboxesItem',
    baseCn: styles.checkbox,
  })

  const inputClassNames = getClassNames({
    name: 'checkboxesInput',
    baseCn: styles.field,
  })

  const labelClassNames = getClassNames({
    name: 'checkboxesLabel',
    baseCn: styles.labelCheckbox,
  })

  const dataAttributes = getDataAttributes({
    component: 'Checkboxes',
  })

  return (
    <div
      className={wrapperClassNames}
      role="group"
      {...dataAttributes}
      {...innerProps}
    >
      {optionsObj.map(([optionKey, optionValue], i) => {
        const checked = Array.isArray(fieldController.value)
          ? fieldController.value.includes(optionKey)
          : false

        const id = `checkboxes-${optionKey.trim()}-${i}`

        return (
          <div key={optionKey} className={itemClassNames} {...itemProps}>
            <input
              id={id}
              className={inputClassNames}
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

            <label htmlFor={id} className={labelClassNames} {...labelProps}>
              {optionValue}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(Checkboxes)
