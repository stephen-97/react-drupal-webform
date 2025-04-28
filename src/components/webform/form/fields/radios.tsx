import { string, object, StringSchema, ObjectSchema } from 'yup'
import cn from 'classnames'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TFormatFieldMulti } from '@/lib/types/form.d'
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
      <>
        {optionsObj.map(([key, value], i) => (
          <label key={i}>
            <input
              className={cn(styles.field, styles.input)}
              name={fieldController.name}
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
            <span>{value}</span>
          </label>
        ))}
      </>
    </Wrapper>
  )
}
