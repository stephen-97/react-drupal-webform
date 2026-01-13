import React, { useRef } from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'
import styles from '../field.module.scss'
import { ManagedFileProps } from '../../../../lib/types/components/managedFile'
import { handleFileChange } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions'
import ManagedFilePreview from '../fields-sub-components/managedFilePreview/managedFilePreview'
import { TFileWithBase64 } from '../../../../lib/types/form.d'

const ManagedFile = ({
  fieldKey,
  field,
  classNames,
  onBlur,
  className,
  innerProps,
  components,
}: ManagedFileProps) => {
  const { control } = useFormContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const { field: fieldController, fieldState } = useController({
    name: fieldKey,
    control,
  })

  const PreviewComponent = components?.managedFilePreview ?? ManagedFilePreview

  const fileExtensions = field?.['#file_extensions']
    ?.trim()
    .split(' ')
    .map((ext) => `.${ext}`)
    .join(', ')

  const value = fieldController.value ?? {}

  const isFileWithBase64 = (obj: any): obj is TFileWithBase64 =>
    obj &&
    typeof obj === 'object' &&
    'base64' in obj &&
    typeof obj.base64 === 'string'

  const handleRemove = () => {
    fieldController.onChange({})
  }

  if (isFileWithBase64(value)) {
    return <PreviewComponent value={value} handleRemove={handleRemove} />
  }

  return (
    <input
      id={fieldKey}
      ref={inputRef}
      type="file"
      name={fieldController.name}
      accept={fileExtensions}
      onChange={(e) => handleFileChange(e, fieldController, inputRef)}
      onBlur={onBlur}
      className={cn(
        classNames.fields.managedFile.input,
        styles.field,
        styles.input,
        styles[field?.['#type']],
        className,
        { [styles.error]: fieldState?.error }
      )}
      {...innerProps}
    />
  )
}

export default React.memo(ManagedFile)
