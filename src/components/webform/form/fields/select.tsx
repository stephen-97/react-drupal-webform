import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import { TFormatFieldMulti } from '@/lib/types/form.d'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import cn from 'classnames'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderSelect = (props: TFieldObj) => {
  const { control, key, field, components, classNames, onBlur, valueFormat } =
    props
  const { key: _, ...restProps } = props

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  if (!field?.['#options']) {
    return null
  }
  const options: Record<string, string> = field['#options']
  const optionsObj: [string, string][] = Object.entries(options)
  const { select: selectFormat } = valueFormat

  const CustomSelect = components?.select

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldSelect'}
      components={components}
      stateError={fieldState.error}
      key={key}
      fieldKey={key}
    >
      {CustomSelect ? (
        <CustomSelect
          fieldController={fieldController}
          fieldState={fieldState}
          {...restProps}
        />
      ) : (
        <select
          className={cn(
            classNames.fields.select?.select,
            styles.field,
            styles[field?.['#type']],
            {
              [styles.error]: fieldState.error,
            }
          )}
          value={fieldController.value ?? ''}
          required={field?.['#required']}
          id={key}
          name={fieldController.name}
          onChange={(e) =>
            handleChangeOptions(
              e.target.value,
              selectFormat,
              fieldController,
              options
            )
          }
        >
          <option className={classNames.fields.select.option} value="">
            {field?.['#placeholder'] ?? '-- Select an option --'}
          </option>
          {optionsObj.map(([key, value], i) => (
            <option
              className={classNames.fields.select.option}
              key={i}
              value={key}
            >
              {value}
            </option>
          ))}
        </select>
      )}
    </Wrapper>
  )
}
