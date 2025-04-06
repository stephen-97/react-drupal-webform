import { ChangeEvent } from 'react'
import { TFormatFieldMulti } from '@/lib/types/form'

const handleChangeOptions = (
  event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
  format: TFormatFieldMulti,
  fieldController: any,
  options: Record<string, string>,
  optionsObj: [string, string][],
  fieldType?: 'select' | 'radios' | 'checkboxes'
) => {
  const selectedKey = event.target.value
  const checked = (event.target as any)?.checked

  let transformedValue:
    | string
    | Record<string, string>
    | Record<string, boolean>
    | string[]
    | Record<string, string>[]

  if (fieldType === 'checkboxes') {
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
  } else {
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
  }

  fieldController.onChange(transformedValue)
}

export { handleChangeOptions }
