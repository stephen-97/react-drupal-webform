import React from 'react'
import cn from 'classnames'
import styles from '../field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { RadiosProps } from '../../../../lib/types/components/radios'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const Radios = ({
  fieldKey,
  field,
  className,
  innerProps,
  itemProps,
  inputProps,
  labelProps,
  ariaDescribedBy,
  classNamePrefix,
}: RadiosProps) => {
  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const optionsObj = Object.entries(field['#options'] as Record<string, string>)

  const { field: fieldController } = useController<any>({
    name: fieldKey,
    control,
  })

  const radiosWrapperClassNames = getClassNames({
    name: 'radiosWrapper',
    prefix: classNamePrefix,
    baseCn: cn(styles.radiosGroupWrapper, className),
  })

  const radiosItemClassNames = getClassNames({
    name: 'radiosItem',
    prefix: classNamePrefix,
    baseCn: styles.radiosItemWrapper,
  })

  const radiosInputClassNames = getClassNames({
    name: 'radiosInput',
    prefix: classNamePrefix,
  })

  const radiosLabelClassNames = getClassNames({
    name: 'radiosLabel',
    prefix: classNamePrefix,
    baseCn: styles.radioLabel,
  })

  const dataAttributes = getDataAttributes({
    component: 'Radios',
  })

  return (
    <div
      className={radiosWrapperClassNames}
      role="radiogroup"
      {...dataAttributes}
      {...innerProps}
    >
      {optionsObj.map(([optionKey, optionValue], i) => {
        const checked = fieldController.value === optionKey
        const id = `radios-${optionKey.trim()}-${i}`

        return (
          <div key={optionKey} className={radiosItemClassNames} {...itemProps}>
            <input
              id={id}
              className={radiosInputClassNames}
              name={fieldController.name}
              type="radio"
              value={optionKey}
              checked={checked}
              aria-describedby={ariaDescribedBy}
              onChange={() => fieldController.onChange(optionKey)}
              {...inputProps}
            />

            <label
              htmlFor={id}
              className={radiosLabelClassNames}
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

export default React.memo(Radios)
