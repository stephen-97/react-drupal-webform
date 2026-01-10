import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import { handleChangeOptions } from '../../../lib/functions/webform_fields_functions/webform_fields_functions'
import Wrapper from './fields-sub-components/wrapper'

export const renderRadio = (props: TFieldWebformObj) => {
  const { onBlur, fieldKey, field, classNames, components } = props
  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const optionsObj = Object.entries(field['#options'] as Record<string, string>)

  const CustomRadio = components?.fieldById?.[fieldKey] ?? components?.radios

  const controller = useController<any>({ name: fieldKey, control })
  const { field: fieldController, fieldState } = controller

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldRadio"
      components={components}
      stateError={fieldState?.error}
      key={fieldKey}
      fieldKey={fieldKey}
      wrapperElement="fieldset"
      innerPropsLabelComponent={{ wrapperElement: 'legend' }}
    >
      {CustomRadio ? (
        <CustomRadio {...props} />
      ) : (
        <div
          className={cn(
            classNames.fields.radios?.groupWrapper,
            styles.radiosGroupWrapper
          )}
        >
          {optionsObj.map(([optionKey, optionValue]) => {
            const checked = fieldController.value === optionKey
            const inputId = `${fieldKey}-${optionKey.trim()}`

            return (
              <div
                className={cn(
                  classNames.fields.radios?.itemWrapper,
                  styles.radiosItemWrapper
                )}
                key={optionKey}
              >
                <input
                  className={classNames.fields.radios?.input}
                  name={fieldController.name}
                  id={inputId}
                  type="radio"
                  checked={checked}
                  value={optionKey}
                  onChange={(e) =>
                    handleChangeOptions(e.target.value, fieldController)
                  }
                  onBlur={onBlur}
                />
                <label
                  htmlFor={inputId}
                  className={cn(
                    classNames.fields.radios?.label,
                    styles.radioLabel
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
