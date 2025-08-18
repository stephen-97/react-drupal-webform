import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'

export const renderHidden = (props: TFieldWebformObj) => {
  const { key } = props
  const { control } = useFormContext()

  const { field: fieldController } = useController<any>({
    name: key,
    control,
  })

  return (
    <input
      type="hidden"
      id={key}
      name={fieldController.name}
      value={fieldController.value ?? ''}
      onChange={(e) => fieldController.onChange?.(e)}
    />
  )
}
