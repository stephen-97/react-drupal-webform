import React from 'react'
import { components } from '@/lib/const/const.form'
import { TFieldObjCustom } from '@/components/webform/form/fields/fields-special-components/fieldObjCustom'
import Select from 'react-select'

const CustomSelect = (props: TFieldObjCustom) => {
  const { field, fieldController, fieldState, onBlur } = props

  const options: Record<string, string> = field['#options']
  const optionsObj: [string, string][] = Object.entries(options)

  const convertObjectToArray = (obj: { [key: string]: string }) => {
    return Object.entries(obj).map(([key, value]) => ({
      value: key,
      label: value,
    }))
  }

  const optionForReactSelect = convertObjectToArray(options)

  console.log(optionForReactSelect)
  return (
    <components.Select {...props}>
      <Select
        value={optionForReactSelect[0]}
        onChange={(e) => console.log(e)}
        options={optionForReactSelect}
      />
    </components.Select>
  )
}
export default CustomSelect
