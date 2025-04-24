import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import { TFormatFieldMulti } from '@/lib/types/form.d'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import cn from 'classnames'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

export const renderSelect = ({
  control,
  key,
  keyForMap,
  field,
  valueFormat,
  classNames,
  components,
}: TFieldObj) => {
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

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName={'fieldSelect'}
      components={components}
      stateError={fieldState.error}
      key={keyForMap}
    >
      <select
        className={cn(styles.field)}
        name={fieldController.name}
        onChange={(e) =>
          handleChangeOptions(
            e,
            selectFormat as TFormatFieldMulti,
            fieldController,
            options,
            optionsObj
          )
        }
      >
        {optionsObj.map(([key, value], i) => (
          <option key={i} value={key}>
            {value}
          </option>
        ))}
      </select>
    </Wrapper>
  )
}
