import { TFormatFieldMulti, TWrapperCategory } from '../../types/form.d'
import { ControllerRenderProps } from 'react-hook-form'
import React from 'react'
import { fileToBase64 } from './webform_fields_file_functions'
import { TDrupal_FieldType } from '../../types/components/field'

const handleChangeOptions = (
  selectedKey: string,
  fieldController: ControllerRenderProps<any, string>
) => {
  fieldController.onChange(selectedKey)
}

const handleChangeOptionsCheckboxes = (
  selectedKey: string,
  checked: boolean,
  fieldController: any
) => {
  let selectedKeys: string[] = Array.isArray(fieldController.value)
    ? [...fieldController.value]
    : []

  if (checked && !selectedKeys.includes(selectedKey)) {
    selectedKeys.push(selectedKey)
  } else if (!checked) {
    selectedKeys = selectedKeys.filter((key) => key !== selectedKey)
  }

  fieldController.onChange(selectedKeys)
}

const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  fieldController: ControllerRenderProps<any, string>,
  inputRef: React.RefObject<HTMLInputElement | null>
) => {
  try {
    const { files } = event.target

    if (files && files.length > 0 && inputRef?.current) {
      const file: File = files[0]
      const base64: string = await fileToBase64(file)

      fieldController.onChange({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModified,
        base64,
      })

      inputRef.current.value = ''
    }
  } catch (err) {
    console.error('Error', err)
  }
}

const getWrapperCategory = (
  type: TDrupal_FieldType
): TWrapperCategory | undefined => {
  if (['textfield', 'textarea', 'email', 'number', 'tel'].includes(type))
    return 'textInput'
  if (['select', 'radios'].includes(type)) return 'selectionInput'
  if (['checkbox', 'checkboxes'].includes(type)) return 'booleanInput'
  return undefined
}

export const getRadioChecked = ({
  radioFormat,
  optionKey,
  optionValue,
  fieldControllerValue,
}: {
  radioFormat: string
  optionKey: string
  optionValue: string
  fieldControllerValue: any
}) => {
  if (radioFormat === 'booleanMap') {
    return Boolean(fieldControllerValue?.[optionKey])
  }
  if (radioFormat === 'key') {
    return fieldControllerValue === optionKey
  }
  if (radioFormat === 'value') {
    return fieldControllerValue === optionValue
  }
  if (radioFormat === 'keyValue') {
    return fieldControllerValue?.key === optionKey
  }
  return false
}

export const getCheckboxChecked = ({
  checkboxesFormat,
  optionKey,
  optionValue,
  fieldControllerValue,
}: {
  checkboxesFormat: string
  optionKey: string
  optionValue: string
  fieldControllerValue: any
}) => {
  if (checkboxesFormat === 'booleanMap') {
    return Boolean(fieldControllerValue?.[optionKey])
  }
  if (checkboxesFormat === 'key') {
    return (
      Array.isArray(fieldControllerValue) &&
      fieldControllerValue.includes(optionKey)
    )
  }
  if (checkboxesFormat === 'value') {
    return (
      Array.isArray(fieldControllerValue) &&
      fieldControllerValue.includes(optionValue)
    )
  }
  if (checkboxesFormat === 'keyValue') {
    return (
      Array.isArray(fieldControllerValue) &&
      fieldControllerValue.some(
        (entry: Record<string, string>) => Object.keys(entry)[0] === optionKey
      )
    )
  }
  return false
}
export {
  handleChangeOptions,
  handleFileChange,
  handleChangeOptionsCheckboxes,
  getWrapperCategory,
}
