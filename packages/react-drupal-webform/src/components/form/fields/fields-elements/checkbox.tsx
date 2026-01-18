import React from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import { CheckboxProps } from '../../../../lib/types/components/checkboxe'
const Checkbox = ({
  fieldKey,
  field,
  classNames,
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

  return (
    <input
      id={fieldKey}
      name={fieldController.name}
      type="checkbox"
      value={title}
      checked={Boolean(fieldController.value)}
      onChange={(e) => fieldController.onChange(e.target.checked)}
      onBlur={onBlur}
      className={cn(classNames.fields.checkbox?.input, className)}
      {...innerProps}
    />
  )
}

export default React.memo(Checkbox)
