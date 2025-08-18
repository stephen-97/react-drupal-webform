import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import {
  getRadioChecked,
  handleChangeOptions,
} from '../../../lib/functions/webform_fields_functions/webform_fields_functions'
import Wrapper from './fields-sub-components/wrapper'

export const renderRadio = (props: TFieldWebformObj) => {
  const { onBlur, key, field, valueFormat, classNames, components } = props
  const { control } = useFormContext()

  if (!field?.['#options']) {
    return null
  }

  const options: Record<string, string> = field['#options']
  const optionsObj: [string, string][] = Object.entries(options)

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  const { radios: radioFormat } = valueFormat

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldRadio'}
      components={components}
      stateError={fieldState.error}
      key={key}
      fieldKey={key}
      wrapperElement={'fieldset'}
      innerPropsLabelComponent={{
        wrapperElement: 'legend',
      }}
    >
      <div
        className={cn(
          classNames.fields.radios?.groupWrapper,
          styles.radiosGroupWrapper
        )}
      >
        {optionsObj.map(([optionKey, optionValue], i) => {
          const checked = getRadioChecked({
            radioFormat,
            optionKey,
            optionValue,
            fieldControllerValue: fieldController.value,
          })

          return (
            <div
              className={cn(
                classNames.fields.radios?.itemWrapper,
                styles.radiosItemWrapper
              )}
              key={i}
            >
              <input
                className={cn(classNames.fields.radios?.input)}
                name={fieldController.name}
                id={`${optionKey}-${i}`}
                type="radio"
                checked={checked}
                value={optionKey}
                onChange={(e) =>
                  handleChangeOptions(
                    e.target.value,
                    radioFormat,
                    fieldController,
                    options
                  )
                }
                onBlur={onBlur}
              />
              <label
                htmlFor={`${optionKey}-${i}`}
                className={cn(
                  classNames.fields.radios.label,
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
