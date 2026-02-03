import React, { ChangeEvent } from 'react'
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
  unstyled,
  innerRef,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  onFocus: onFocusProp,
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
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.radiosGroupWrapper),
  })

  const radiosItemClassNames = getClassNames({
    name: 'radiosItem',
    prefix: classNamePrefix,
    unstyled: unstyled,
    baseCn: styles.radiosItemWrapper,
  })

  const radiosInputClassNames = getClassNames({
    name: 'radiosInput',
    prefix: classNamePrefix,
    unstyled: unstyled,
  })

  const radiosLabelClassNames = getClassNames({
    name: 'radiosLabel',
    prefix: classNamePrefix,
    unstyled: unstyled,
    baseCn: styles.radioLabel,
  })

  const dataAttributes = getDataAttributes({
    component: 'Radios',
  })

  const handleChange =
    (value: string) => (e: ChangeEvent<HTMLInputElement>) => {
      fieldController.onChange(value)
      onChangeProp?.(e)
    }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    fieldController.onBlur()
    onBlurProp?.(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocusProp?.(e)
  }

  return (
    <div
      className={radiosWrapperClassNames}
      role="radiogroup"
      ref={innerRef}
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
              required={field?.['#required']}
              onChange={handleChange(optionKey)}
              onBlur={handleBlur}
              onFocus={handleFocus}
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
