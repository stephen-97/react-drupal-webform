import React from 'react'
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
  onBlur,
  innerProps,
  className,
}: CheckboxProps) => {
  const { control } = useFormContext()

  const { field: fieldController } = useController<any>({
    name: fieldKey,
    control,
  })

  const title = field?.['#title']

  const checkboxClassNames = getClassNames({
    name: 'checkbox',
    baseCn: cn(className),
  })

  const dataAttributes = getDataAttributes({
    component: 'checkbox',
  })

  return (
    <input
      id={fieldKey}
      name={fieldController.name}
      type="checkbox"
      value={title}
      checked={Boolean(fieldController.value)}
      onChange={(e) => fieldController.onChange(e.target.checked)}
      onBlur={onBlur}
      className={checkboxClassNames}
      {...dataAttributes}
      {...innerProps}
    />
  )
}

export default React.memo(Checkbox)
