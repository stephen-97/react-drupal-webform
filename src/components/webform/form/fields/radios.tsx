import cn from 'classnames'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import {
  getRadioChecked,
  handleChangeOptions,
} from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderRadio = ({
  onBlur,
  control,
  key,
  field,
  valueFormat,
  classNames,
  components,
}: TFieldObj) => {
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

  const checked =
    radioFormat === 'booleanMap'
      ? Boolean(fieldController.value?.[key])
      : radioFormat === 'key'
        ? fieldController.value === key
        : radioFormat === 'value'
          ? fieldController.value === value
          : radioFormat === 'keyValue'
            ? fieldController.value?.key === key
            : false

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
                className={cn(
                  classNames.fields.radios?.input,
                  styles.radioInput
                )}
                name={fieldController.name}
                id={`${optionKey}-${i}`}
                type={'radio'}
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
