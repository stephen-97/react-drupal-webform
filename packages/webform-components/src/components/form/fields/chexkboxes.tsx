import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import {
  getCheckboxChecked,
  handleChangeOptionsCheckboxes,
} from '../../../lib/functions/webform_fields_functions/webform_fields_functions'
import { TFormatFieldMulti } from '../../../lib/types/form.d'
import Wrapper from './fields-sub-components/wrapper'

export const renderCheckboxes = (props: TFieldWebformObj) => {
  const { key, field, components, classNames, onBlur, valueFormat } = props
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

  const { checkboxes: checkboxesFormat } = valueFormat
  const { key: _, ...restProps } = props

  const CustomCheckboxes = components?.checkboxes

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldCheckboxes'}
      stateError={fieldState.error}
      key={key}
      components={components}
      fieldKey={key}
      wrapperElement={'fieldset'}
      innerPropsLabelComponent={{
        wrapperElement: 'legend',
      }}
    >
      {CustomCheckboxes ? (
        <CustomCheckboxes
          fieldController={fieldController}
          fieldState={fieldState}
          {...restProps}
        />
      ) : (
        <div
          className={cn(
            classNames.fields.checkboxes?.groupWrapper,
            styles.checkboxes
          )}
        >
          {optionsObj.map(([optionKey, optionValue], i) => {
            const checked = getCheckboxChecked({
              checkboxesFormat,
              optionKey,
              optionValue,
              fieldControllerValue: fieldController.value,
            })
            return (
              <div
                className={cn(
                  classNames.fields.checkboxes?.itemWrapper,
                  styles.checkbox
                )}
                key={i}
              >
                <input
                  className={cn(
                    classNames.fields.checkboxes?.itemWrapper,
                    styles.field
                  )}
                  name={fieldController.name}
                  type={'checkbox'}
                  id={`checkboxes-${optionKey}-${i}`}
                  value={optionKey}
                  checked={checked}
                  onChange={(e) =>
                    handleChangeOptionsCheckboxes(
                      e.target.value,
                      e.target.checked,
                      checkboxesFormat as TFormatFieldMulti,
                      fieldController,
                      options,
                      optionsObj
                    )
                  }
                  onBlur={onBlur}
                />
                <label
                  htmlFor={`checkboxes-${optionKey}-${i}`}
                  className={cn(classNames.fields.checkboxes.label)}
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
