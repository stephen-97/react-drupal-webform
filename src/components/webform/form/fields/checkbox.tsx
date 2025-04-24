import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderCheckbox = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  classNames,
  components,
}: TFieldObj) => {
  const title = field?.['#title']

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldCheckboxes'}
      stateError={fieldState.error}
      key={keyForMap}
      components={components}
    >
      <>
        <input
          name={fieldController.name}
          checked={Boolean(fieldController.value)}
          type={'checkbox'}
          value={title}
          onChange={(e) => fieldController.onChange?.(e.target.checked)}
          onBlur={onBlur}
        />
        <span>{title}</span>
      </>
    </Wrapper>
  )
}
