import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'

export const renderHidden = (props: TFieldWebformObj) => {
  const { fieldKey, components } = props
  const { control } = useFormContext()

  const { field: fieldController } = useController<any>({
    name: fieldKey,
    control,
  })

  const CustomHidden = components?.fieldById?.[fieldKey] ?? components?.hidden

  if (CustomHidden) {
    return <CustomHidden {...props} />
  }

  return (
    <input
      type="hidden"
      id={fieldKey}
      name={fieldController.name}
      value={fieldController.value ?? ''}
      onChange={(e) => fieldController.onChange?.(e)}
    />
  )
}
