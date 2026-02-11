import { ControllerRenderProps } from 'react-hook-form'
import React from 'react'
import { fileToBase64 } from './webform_fields_file_functions'

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

export { handleChangeOptions, handleFileChange, handleChangeOptionsCheckboxes }
