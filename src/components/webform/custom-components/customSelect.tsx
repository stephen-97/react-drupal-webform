'use client'

import React from 'react'
import { components } from '@/lib/const/const.form'
import { TFieldObjCustom } from '@/components/webform/form/fields/fields-special-components/fieldObjCustom'
import Select from 'react-select'
import { handleChangeOptions } from '@/lib/functions/webform_fields_functions/webform_fields_functions'

const CustomSelect = (props: TFieldObjCustom) => {
  const { field, fieldController, valueFormat } = props

  const options: Record<string, string> = field['#options']

  const convertObjectToArray = (obj: { [key: string]: string }) => {
    return Object.entries(obj).map(([key, value]) => ({
      value: key,
      label: value,
    }))
  }

  const optionForReactSelect = convertObjectToArray(options)
  const { select: selectFormat } = valueFormat

  return (
    <components.Select {...props}>
      <Select
        styles={{
          option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#B7E8CD' : '#ffffff',
            color: '#000000',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#B7E8CD',
            },
          }),
          control: (provided: any) => ({
            ...provided,
            backgroundColor: '#ffffff',
            color: '#000000',
            borderColor: '#ccc',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#888',
            },
          }),
          menu: (provided: any) => ({
            ...provided,
            backgroundColor: '#ffffff',
            borderRadius: '.5rem',
            overflow: 'hidden',
          }),
        }}
        onChange={(e) =>
          handleChangeOptions(
            e?.value as string,
            selectFormat,
            fieldController,
            options
          )
        }
        options={optionForReactSelect}
      />
    </components.Select>
  )
}
export default CustomSelect
