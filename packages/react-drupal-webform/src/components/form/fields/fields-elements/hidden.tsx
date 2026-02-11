import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { HiddenProps } from '../../../../lib/types/components/hidden'
import cn from 'classnames'

const Hidden = ({ fieldKey, innerProps, className, innerRef }: HiddenProps) => {
  const { control } = useFormContext()

  const { field: fieldController } = useController({
    name: fieldKey,
    control,
  })

  return (
    <input
      type="hidden"
      ref={innerRef}
      id={fieldKey}
      name={fieldController.name}
      className={cn(className)}
      value={fieldController.value ?? ''}
      onChange={(e) => fieldController.onChange(e.target.value)}
      {...innerProps}
    />
  )
}

export default React.memo(Hidden)
