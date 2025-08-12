import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'
import cn from 'classnames'
import styles from './field.module.scss'
export const renderCheckbox = ({
  onBlur,
  control,
  key,
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
      key={key}
      components={components}
      fieldKey={key}
    >
      <div
        className={cn(classNames.fields.checkbox?.itemWrapper, styles.checkbox)}
      >
        <input
          className={cn(classNames.fields.checkbox.input)}
          name={fieldController.name}
          id={key}
          checked={Boolean(fieldController.value)}
          type="checkbox"
          value={title}
          onChange={(e) => fieldController.onChange?.(e.target.checked)}
          onBlur={onBlur}
        />
        <label htmlFor={key} className={cn(classNames.fields.checkbox.label)}>
          {title}
        </label>
      </div>
    </Wrapper>
  )
}
