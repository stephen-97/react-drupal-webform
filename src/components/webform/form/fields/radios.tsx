import cn from 'classnames'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderRadio = ({
  onBlur,
  control,
  key,
  keyForMap,
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

  const { radio: radioFormat } = valueFormat

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldRadio'}
      components={components}
      stateError={fieldState.error}
      key={keyForMap}
    >
      <div
        className={cn(
          classNames.fields.radios?.groupWrapper,
          styles.radiosGroupWrapper
        )}
      >
        {optionsObj.map(([key, value], i) => (
          <div
            className={cn(
              classNames.fields.radios?.itemWrapper,
              styles.radiosItemWrapper
            )}
            key={i}
          >
            <input
              className={cn(classNames.fields.radios?.input, styles.radioInput)}
              name={fieldController.name}
              id={`radios-${keyForMap}-${i}`}
              type={'radio'}
              value={key}
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
              htmlFor={`radio-buttons-${keyForMap}-${i}`}
              className={cn(classNames.fields.radios.label, styles.radioLabel)}
            >
              {value}
            </label>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
