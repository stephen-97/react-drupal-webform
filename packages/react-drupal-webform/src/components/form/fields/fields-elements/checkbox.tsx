import React, { ChangeEvent } from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import { CheckboxProps } from '../../../../lib/types/components/checkboxe'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'
const Checkbox = ({
  fieldKey,
  field,
  innerProps,
  className,
  ariaDescribedBy,
  classNamePrefix,
  unstyled,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  onFocus: onFocusProp,
}: CheckboxProps) => {
  const { control } = useFormContext()

  const { field: fieldController } = useController<any>({
    name: fieldKey,
    control,
  })

  const title = field?.['#title']

  const checkboxClassNames = getClassNames({
    name: 'checkbox',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
  })

  const dataAttributes = getDataAttributes({
    component: 'checkbox',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    fieldController.onChange(e.target.checked)
    if (onChangeProp) {
      onChangeProp(e)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    fieldController.onBlur()
    if (onBlurProp) {
      onBlurProp(e)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onFocusProp) {
      onFocusProp(e)
    }
  }

  return (
    <input
      id={fieldKey}
      name={fieldController.name}
      type="checkbox"
      value={title}
      checked={Boolean(fieldController.value)}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      className={checkboxClassNames}
      aria-describedby={ariaDescribedBy}
      {...dataAttributes}
      {...innerProps}
    />
  )
}

export default React.memo(Checkbox)
