import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import { handleChangeOptions } from '../../../lib/functions/webform_fields_functions/webform_fields_functions'
import Wrapper from './fields-sub-components/wrapper'

export const renderRadio = (props: TFieldWebformObj) => {
  const { onBlur, key: fieldKey, field, classNames, components } = props
  const { control } = useFormContext()

  if (!field?.['#options']) {
    return null
  }

  const options: Record<string, string> = field['#options']
  const optionsObj: [string, string][] = Object.entries(options)

  const { field: fieldController, fieldState } = useController<any>({
    name: fieldKey,
    control,
  })

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldRadio"
      components={components}
      stateError={fieldState.error}
      key={fieldKey}
      fieldKey={fieldKey}
      wrapperElement="fieldset"
      innerPropsLabelComponent={{
        wrapperElement: 'legend',
      }}
    >
      <div
        className={cn(
          classNames.fields.radios?.groupWrapper || undefined,
          styles.radiosGroupWrapper
        )}
      >
        {optionsObj.map(([optionKey, optionValue]) => {
          const checked = fieldController.value === optionKey
          const inputId = `${fieldKey}-${optionKey}`

          return (
            <div
              className={cn(
                classNames.fields.radios?.itemWrapper || undefined,
                styles.radiosItemWrapper
              )}
              key={optionKey}
            >
              <input
                className={classNames.fields.radios?.input || undefined}
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
                  classNames.fields.radios?.label || undefined,
                  styles.radioLabel
                )}
              >
                {optionValue}
              </label>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}
