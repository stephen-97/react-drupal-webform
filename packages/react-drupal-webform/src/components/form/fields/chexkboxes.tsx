import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import { handleChangeOptionsCheckboxes } from '../../../lib/functions/webform_fields_functions/webform_fields_functions'
import Wrapper from './fields-sub-components/wrapper'

export const renderCheckboxes = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames, onBlur } = props
  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const optionsObj = Object.entries(field['#options'] as Record<string, string>)

  const CustomCheckboxes =
    components?.fieldById?.[fieldKey] ?? components?.checkboxes

  const controller = useController<any>({ name: fieldKey, control })
  const { field: fieldController, fieldState } = controller

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldCheckboxes"
      stateError={fieldState?.error}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
      wrapperElement="fieldset"
    >
      {CustomCheckboxes ? (
        <CustomCheckboxes {...props} />
      ) : (
        <div
          className={cn(
            classNames.fields.checkboxes?.groupWrapper,
            styles.checkboxes
          )}
        >
          {optionsObj.map(([optionKey, optionValue], i) => {
            const checked = Array.isArray(fieldController.value)
              ? fieldController.value.includes(optionKey)
              : false
            const correctOptionKey = optionKey.trim()

            return (
              <div
                className={cn(
                  classNames.fields.checkboxes?.itemWrapper,
                  styles.checkbox
                )}
                key={optionKey}
              >
                <input
                  id={`checkboxes-${correctOptionKey}-${i}`}
                  className={cn(
                    classNames.fields.checkboxes?.input,
                    styles.field
                  )}
                  name={fieldController.name}
                  type="checkbox"
                  value={optionKey}
                  checked={checked}
                  onChange={(e) =>
                    handleChangeOptionsCheckboxes(
                      e.target.value,
                      e.target.checked,
                      fieldController
                    )
                  }
                  onBlur={onBlur}
                />
                <label
                  htmlFor={`checkboxes-${correctOptionKey}-${i}`}
                  className={cn(
                    classNames.fields.checkboxes?.label,
                    styles.labelCheckbox
                  )}
                >
                  {optionValue}
                </label>
              </div>
            )
          })}
        </div>
      )}
    </Wrapper>
  )
}
