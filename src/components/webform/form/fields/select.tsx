import { object, bool, string } from 'yup'
import { TFieldValidate } from '@/lib/types/field'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/field'
import { ChangeEvent } from 'react'
import { TFormatFieldMulti } from '@/lib/types/form'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'

export const renderSelect = ({
  onBlur,
  control,
  key,
  keyForMap,
  field,
  valueFormat,
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
    <select
      key={keyForMap}
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
  )
}

export const validateSelect = ({
  yupObject,
  defaultValues,
  key,
  field,
  visibility,
}: TFieldValidate) => {
  yupObject[key] = visibility ? string().required('required field') : string()

  defaultValues[key] = null
}
