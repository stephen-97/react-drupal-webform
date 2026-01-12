import React from 'react'
import cn from 'classnames'
import styles from '../field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { RadiosProps } from '../../../../lib/types/components/radios'

const Radios = ({
  fieldKey,
  field,
  classNames,
  className,
  innerProps,
  itemProps,
  inputProps,
  labelProps,
}: RadiosProps) => {
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
        classNames.fields.radios?.groupWrapper,
        styles.radiosGroupWrapper,
        className
      )}
      role="radiogroup"
      {...innerProps}
    >
      {optionsObj.map(([optionKey, optionValue], i) => {
        const checked = fieldController.value === optionKey
        const id = `radios-${optionKey.trim()}-${i}`

        return (
          <div
            key={optionKey}
            className={cn(
              classNames.fields.radios?.itemWrapper,
              styles.radiosItemWrapper
            )}
            {...itemProps}
          >
            <input
              id={id}
              className={cn(classNames.fields.radios?.input)}
              name={fieldController.name}
              type="radio"
              value={optionKey}
              checked={checked}
              onChange={() => fieldController.onChange(optionKey)}
              {...inputProps}
            />

            <label
              htmlFor={id}
              className={cn(classNames.fields.radios?.label, styles.radioLabel)}
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
