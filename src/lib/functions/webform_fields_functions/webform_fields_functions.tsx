import { TFormatFieldMulti, TWrapperCategory } from '@/lib/types/form.d'
import { ControllerRenderProps } from 'react-hook-form'
import React from 'react'
import { fileToBase64 } from '@/lib/functions/webform_fields_functions/webform_fields_file_functions'
import { TDrupal_FieldType } from '@/lib/types/components/field'

const handleChangeOptions = (
  selectedKey: string,
  format: TFormatFieldMulti,
  fieldController: ControllerRenderProps<any, string>,
  options: Record<string, string>
) => {
  let transformedValue:
    | string
    | Record<string, string>
    | Record<string, boolean>
    | string[]
    | Record<string, string>[]

  const optionsObj: [string, string][] = Object.entries(options)

  switch (format) {
    case 'key':
      transformedValue = selectedKey
      break

    case 'value':
      transformedValue = options[selectedKey]
      break

    case 'keyValue':
      transformedValue = { [selectedKey]: options[selectedKey] }
      break

    case 'booleanMap':
      transformedValue = optionsObj.reduce(
        (acc, [key]) => {
          acc[key] = key === selectedKey
          return acc
        },
        {} as Record<string, boolean>
      )
      break

    default:
      transformedValue = selectedKey
  }

  fieldController.onChange(transformedValue)
}

const handleChangeOptionsCheckboxes = (
  selectedKey: string,
  checked: boolean,
  format: TFormatFieldMulti,
  fieldController: any,
  options: Record<string, string>,
  optionsObj: [string, string][]
) => {
  let transformedValue:
    | string
    | Record<string, string>
    | Record<string, boolean>
    | string[]
    | Record<string, string>[]

  let selectedKeys: string[] = []

  if (format === 'key') {
    selectedKeys = Array.isArray(fieldController.value)
      ? fieldController.value
      : []
  } else if (format === 'value') {
    selectedKeys =
      Object.entries(options)
        .filter(([_, value]) => fieldController.value?.includes(value))
        .map(([key]) => key) ?? []
  } else if (format === 'booleanMap') {
    selectedKeys =
      typeof fieldController.value === 'object' &&
      !Array.isArray(fieldController.value)
        ? Object.keys(fieldController.value).filter(
            (key) => fieldController.value[key]
          )
        : []
  } else if (format === 'keyValue') {
    selectedKeys = Array.isArray(fieldController.value)
      ? fieldController.value.map(
          (obj: { key: string; value: string }) => Object.keys(obj)[0]
        )
      : []
  }

  if (checked && !selectedKeys?.includes(selectedKey)) {
    selectedKeys.push(selectedKey)
  } else {
    selectedKeys = selectedKeys.filter((key) => key !== selectedKey)
  }

  switch (format) {
    case 'key':
      transformedValue = selectedKeys
      break

    case 'value':
      transformedValue = Object.values(options).filter((value, index) =>
        selectedKeys.includes(Object.keys(options)[index])
      )
      break

    case 'keyValue':
      transformedValue = selectedKeys.map((key) => ({ [key]: options[key] }))
      break

    case 'booleanMap':
      const booleanMap = optionsObj.reduce(
        (acc, [key]) => {
          acc[key] = fieldController.value?.[key] ?? false
          return acc
        },
        {} as Record<string, boolean>
      )
      booleanMap[selectedKey] = checked
      transformedValue = booleanMap
      break

    default:
      transformedValue = selectedKeys
  }

  fieldController.onChange(transformedValue)
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
