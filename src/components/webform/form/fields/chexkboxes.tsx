import cn from 'classnames'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import { handleChangeOptionsCheckboxes } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TFormatFieldMulti } from '@/lib/types/form.d'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderCheckboxes = (props: TFieldObj) => {
  const {
    control,
    key,
    keyForMap,
    field,
    components,
    classNames,
    onBlur,
    valueFormat,
  } = props
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
      key={keyForMap}
      components={components}
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
          {optionsObj.map(([key, value], i) => (
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
                  styles.field,
                  styles.checkboxeInput
                )}
                name={fieldController.name}
                type={'checkbox'}
                value={key}
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
              <label className={classNames.fields.checkboxes.label}>
                {value}
              </label>
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  )
}
