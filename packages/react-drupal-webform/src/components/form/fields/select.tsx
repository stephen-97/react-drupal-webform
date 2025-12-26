import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import { handleChangeOptions } from '../../../lib/functions/webform_fields_functions/webform_fields_functions'
import cn from 'classnames'
import Wrapper from './fields-sub-components/wrapper'

export const renderSelect = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames, onBlur } = props
  const { control } = useFormContext()

  if (!field?.['#options']) return null

  const optionsObj = Object.entries(field['#options'] as Record<string, string>)

  const CustomSelect = components?.fieldById?.[fieldKey] ?? components?.select

  const controller = useController<any>({ name: fieldKey, control })
  const { field: fieldController, fieldState } = controller

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldSelect"
      components={components}
      stateError={fieldState?.error}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomSelect ? (
        <CustomSelect {...props} />
      ) : (
        <select
          id={fieldKey}
          name={fieldController.name}
          required={field?.['#required']}
          className={cn(
            classNames.fields.select?.select,
            styles.field,
            styles[field?.['#type']],
            { [styles.error]: fieldState?.error }
          )}
          value={fieldController.value ?? ''}
          onChange={(e) => handleChangeOptions(e.target.value, fieldController)}
        >
          <option className={classNames.fields.select.option} value="">
            {field?.['#placeholder'] ?? '-- Select an option --'}
          </option>

          {optionsObj.map(([optionKey, optionValue]) => (
            <option
              key={optionKey}
              className={classNames.fields.select.option}
              value={optionKey}
            >
              {optionValue}
            </option>
          ))}
        </select>
      )}
    </Wrapper>
  )
}
